import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, Image, TouchableOpacity, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Slider from '@react-native-community/slider';
import config from './../config/config';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, gql } from '@apollo/client';
import Music from '../assets/images/music.png';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

const AudioPlayerPre = ({ route }) => {
  const navigation = useNavigation();
  const { card, trackImg, metafields, trackId } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const { position, duration } = useProgress();
  const [allProductsWithMetafields, setAllProductsWithMetafields] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(card);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const flatListRef = useRef(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [isInitialScroll, setIsInitialScroll] = useState(true);
  const [itemLayouts, setItemLayouts] = useState({});

  const onFlatListLayout = () => {
    if (isInitialScroll && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: trackId });
      setIsInitialScroll(false);
    }
  };

  const handleItemLayout = (index, item) => {
    setItemLayouts((prevLayouts) => ({
      ...prevLayouts,
      [index]: item.layout,
    }));
  };

  useEffect(() => {
    if (!isInitialScroll && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: trackId });
    }
  }, [isInitialScroll, trackId]);

  useEffect(() => {
    setIsLoadingData(true);
    const endpoint = `/admin/api/${config.apiVersion}/products.json`;
    axios
      .get(`${config.shopifyStoreUrl}${endpoint}`, {
        headers: {
          'X-Shopify-Access-Token': config.shopifyApiKey,
        },
      })
      .then(async (response) => {
        if (response.data.products) {
          const products = response.data.products;
          const productsWithMetafields = await Promise.all(
            products.map(async (product) => {
              const metafieldsEndpoint = `/admin/api/${config.apiVersion}/products/${product.id}/metafields.json`;
              const metafieldsResponse = await axios.get(
                `${config.shopifyStoreUrl}${metafieldsEndpoint}`,
                {
                  headers: {
                    'X-Shopify-Access-Token': config.shopifyApiKey,
                  },
                }
              );
              product.metafields = metafieldsResponse.data.metafields;
              return product;
            })
          );
          const filteredProducts = productsWithMetafields.filter((product) => {
            return (
              product.metafields.length > 0 &&
              product.metafields[0].value
            );
          });
          setAllProductsWithMetafields(filteredProducts);
          setIsLoadingData(false);
        }
      })
      .catch((error) => {
        setIsLoadingData(false);
        console.error('Error fetching products:', error);
      });
  }, []);

  const apiEndpoint = `${config.shopifyStoreUrlAudio}/admin/api/${config.apiVersion}/graphql.json`;
  const client = new ApolloClient({
    link: new HttpLink({
      uri: apiEndpoint,
      headers: {
        'X-Shopify-Access-Token': config.shopifyApiKey,
      },
    }),
    cache: new InMemoryCache(),
  });

  const GET_AUDIO_FILE = gql`
    query GetAudioFile($gid: ID!) {
      node(id: $gid) {
        ... on GenericFile {
          url
          mimeType
        }
      }
    }
  `;

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTrack && selectedTrack.metafields.length > 0) {
        try {
          const response = await client.query({
            query: GET_AUDIO_FILE,
            variables: {
              gid: selectedTrack.metafields[0].value,
            },
          });
          await TrackPlayer.seekTo(0);
          await TrackPlayer.reset();
          TrackPlayer.add({
            id: selectedTrack.id,
            url: response.data.node.url,
          });
        } catch (error) {
          console.error('Error fetching audio file:', error);
        }
      }
    };

    fetchData();
  }, [selectedTrack]);

  const togglePlayback = async () => {
    const playbackState = await TrackPlayer.getState();
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipToNext = async () => {
    const currentIndex = allProductsWithMetafields.findIndex(
      (product) => product.id === selectedTrack.id
    );
    const nextIndex = (currentIndex + 1) % allProductsWithMetafields.length;
    setSelectedTrack(allProductsWithMetafields[nextIndex]);
    setIsPlaying(true);
    flatListRef.current.scrollToIndex({ index: nextIndex });
  };

  const skipToPrevious = async () => {
    const currentIndex = allProductsWithMetafields.findIndex(
      (product) => product.id === selectedTrack.id
    );
    const previousIndex =
      (currentIndex - 1 + allProductsWithMetafields.length) % allProductsWithMetafields.length;
    setSelectedTrack(allProductsWithMetafields[previousIndex]);
    setIsPlaying(true);
    flatListRef.current.scrollToIndex({ index: previousIndex });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleTrackPress = async (product) => {
    const { metafields, id } = product;
    if (metafields.length > 0) {
      const trackUrl = metafields[0].value;
      await TrackPlayer.seekTo(0);
      await TrackPlayer.reset();
      TrackPlayer.add({
        id,
        url: trackUrl,
      });
      await TrackPlayer.play();
      setIsPlaying(true);
      setSelectedTrack(product);
    }
  };

  const onScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const index = Math.floor(contentOffset.x / layoutMeasurement.width);
    setVisibleIndex(index);
  };

  useEffect(() => {
    if (allProductsWithMetafields[visibleIndex]) {
      const product = allProductsWithMetafields[visibleIndex];
      handleTrackPress(product);
    }
  }, [visibleIndex]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome6 name="arrow-left" color="#000" size={20} style={styles.icon} />
      </TouchableOpacity>
      {isLoadingData ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={allProductsWithMetafields}
          keyExtractor={(item) => item.id.toString()}
          onLayout={() => onFlatListLayout()}
          onScroll={onScroll}
          renderItem={({ item, index }) => (
            <View style={styles.bannerView} onLayout={(event) => handleItemLayout(index, event)}>
              <TouchableOpacity onPress={() => handleTrackPress(item)}>
                <Image
                  style={styles.artwork}
                  source={
                    item.image && item.image.src
                      ? { uri: item.image.src }
                      : Music
                  }
                />
              </TouchableOpacity>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
        />
      )}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={(value) => TrackPlayer.seekTo(value)}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeContainerText}>{formatTime(position)}</Text>
        <Text style={styles.timeContainerText}>{formatTime(duration)}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={skipToPrevious}>
          <FontAwesome6 name="backward" color="#000" size={20} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayback}>
          <FontAwesome6 name={isPlaying ? 'pause' : 'play'} color="#000" size={20} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext}>
          <FontAwesome6 name="forward" color="#000" size={20} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  bannerView: {
    width: width,
    height: height / 2 - 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  artwork: {
    width: 370,
    height: 400,
    borderRadius: 10,
  },
  slider: {
    width: '90%',
    height: 40,
    backgroundColor: '#ddd'
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  timeContainerText: {
    color: '#000'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 50,
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000'
  },
  loader: {
    height: 400,
    marginTop: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  }
});

export default AudioPlayerPre;
