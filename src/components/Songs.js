import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Music from '../assets/images/music.png';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Footer from './Footer';
import Header from './Header';
import Filter from './Filter';
import AudioPlayer from './AudioPlayer';
import config from './../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Songs = () => {
  const navigation = useNavigation();
  const [productData, setProductData] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balanceData, setBalanceData] = useState(null);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-300)).current;
  const [cartTitle, setCartTitle] = useState('');
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const scrollViewRef = useRef();

  useEffect(() => {
    loadUserData();
    fetchData();
    loadCartCount();
  }, [userDetails]);

  const loadUserData = async () => {
    try {
      const userDetail = await AsyncStorage.getItem('userDetail');
      if (userDetail) {
        const parsedUser = userDetail ? JSON.parse(userDetail) : {};
        setUserDetails(parsedUser);
      }
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
  };

  const fetchData = async () => {
    const email = (userDetails) ? userDetails.email : '';
    const apiUrl = `https://app.shopwaive.com/api/customer/${encodeURIComponent(email)}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'X-Shopwaive-Access-Token': config.shopwaiveAccessToken,
          'X-Shopwaive-Platform': config.shopwaivePlatform,
          'Content-Type': 'application/json'
        },
      });
      const fetchedBalance = response.data;
      setBalanceData(fetchedBalance);
      setBalance(fetchedBalance.balance);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
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
          const tags = [];
          const types = [];
          const productsWithMetafields = await Promise.all(
            products.map(async (product) => {
              if (product.tags !== "") {
                tags.push(product.tags);
              }
              if (product.product_type !== "") {
                types.push(product.product_type);
              }
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
          const uniqueArray = tags.filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
          const uniqueTypes = types.filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
          const filteredProducts = productsWithMetafields.filter((product) => {
            return (
              product.metafields.length > 0 &&
              product.metafields[0].value
            );
          });
          setProductTags(uniqueArray);
          setProductTypes(uniqueTypes);
          setProductData(filteredProducts);
          setFilteredData(filteredProducts);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, []);

  const applyFilter = (selectedTags, selectedTypes) => {
    const filteredProducts = productData.filter((product) => {
      const hasSelectedTag =
        selectedTags.length === 0 || selectedTags.some((tag) => product.tags.includes(tag));
      const hasSelectedType = selectedTypes.length === 0 || selectedTypes.includes(product.product_type);
      return hasSelectedTag && hasSelectedType;
    });
    setFilteredData(filteredProducts);
  };

  const loadCartCount = async () => {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems');
      if (cartItems) {
        const items = JSON.parse(cartItems);
        const totalCartCount = items.reduce((acc, item) => acc + item.count, 0);
        setCartCount(totalCartCount);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
  };

  const addToCart = async (price, plan) => {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems');
      let items = [];
      if (cartItems) {
        items = JSON.parse(cartItems);
      }
      const existingItemIndex = items.findIndex((item) => item.plan === plan);
      if (existingItemIndex !== -1) {
        items[existingItemIndex].count += 1;
      } else {
        items.push({ price, plan, count: 1 });
      }
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
      setCartCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error saving cart item:', error);
    }
  };

  const downloadItem = async (price, plan) => {
    addToCart(price, plan);
    setCartTitle(plan);
    await loadCartCount();
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const toggleModal = async () => {
    if (isModalVisible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -300,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setModalVisible(false));
    }
  }

  const goCart = async () => {
    navigation.navigate('cart');
    await loadCartCount();
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setModalVisible(false));
  }

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView ref={scrollViewRef}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
    >
      <View>
        <Header />
        <View style={styles.facetsContainer}>
          <Filter
            filterVisible={filterVisible}
            setFilterVisible={setFilterVisible}
            productTags={productTags}
            productTypes={productTypes}
            applyFilter={applyFilter}
          />
          <View style={styles.facets}>
            <TouchableOpacity 
             onPress={()=> {
              setFilterVisible(true)
            }}
            style={styles.filter}>
              <FontAwesome6 name="sliders" color="#000" size={20} />
            <Text style={styles.facetsLabel}>Filter</Text>
            </TouchableOpacity>
            <Text style={styles.productCount}>{filteredData.length} products</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          {filteredData.map((card, index) => {
            if (card.metafields.length > 0 && card.metafields[0].value) {
              return (
                <View key={card.id} style={styles.card}>
                  <View style={styles.imageContainer}>
                    {card.image && card.image.src ? (
                      <Image style={styles.cardImage} source={{ uri: card.image.src }} />
                    ) : (
                      <Image style={styles.cardImage} source={Music} />
                    )}
                  </View>
                  <Text style={styles.heading}>{card.title}</Text>
                  <Text style={styles.priceItem}>{Number(card.variants[0].price).toFixed(0)} credit</Text>
                  <View style={styles.audioContain}>
                    <TouchableOpacity onPress={()=>navigation.navigate('audio', { card: card, trackImg: card.image, metafields: card.metafields, trackId: index })} style={styles.playButton}>
                      <Text style={styles.playButtonText}>Preview</Text>
                    </TouchableOpacity>
                  </View>
                  {balance > 0 && userDetails ? (
                    <TouchableOpacity onPress={() => downloadItem(card.variants[0].price, card.title)} style={styles.creditButton}>
                      <Text style={styles.creditButtonText}>Download</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => navigation.navigate('plans')} style={styles.creditButton}>
                      <Text style={styles.creditButtonText}>Buy Credits</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>
        <Animated.View
          style={[
            styles.modal,
            {
              opacity,
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [0, 300],
                    outputRange: [0, -300],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              position: 'absolute',
              alignSelf: 'center',
              top: 100,
            },
          ]}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Item added to your cart</Text>
            <Text style={styles.modalText}>{cartTitle}</Text>
            <TouchableOpacity
              onPress={()=> goCart() }
              style={styles.viewCart}>
              <Text style={styles.viewText}>View cart ({cartCount})</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>navigation.navigate('checkout')}
              style={styles.checkout}>
              <Text style={styles.checkText}>Check out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('songs')}>
              <Text style={styles.closeText}>Continue shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Footer />
      </View>
    </ScrollView>
  );
};

export default Songs;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facetsContainer: {
    flex: 1
  },
  facets: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20
  },
  filter: {
    top: 12,
  },
  facetsLabel: {
    left: 35,
    bottom: 25,
    fontSize: 18,
    color: '#000'
  },
  productCount: {
    top: 12,
    fontSize: 14,
    color: '#000'
  },

  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    position: 'relative',
    marginBottom: 80
  },
  card: {
    width: 180,
    marginBottom: 20
  },
  imageContainer: {
    flex: 3,
    top: 20,
    alignSelf: 'center',
    textAlign: 'center'
  },
  cardImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  heading: {
    flex: 1,
    top: 50,
    fontSize: 12,
    color: '#000'
  },
  priceItem: {
    flex: 1,
    top: 65,
    fontSize: 16,
    color: '#000'
  },
  creditButton: {
    flex: 2,
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000000',
    top: 10,
  },
  creditButtonText: {
    textAlign: 'center',
    top: 10,
    color: '#000'
  },
  audioContain: {
    flex: 2
  },
  playButton: {
    flexDirection: 'row',
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c9d3d8',
    height: 50,
    borderRadius: 50,
  },
  playButtonText: {
    textAlign: 'center',
    color: '#000'
  },
  modal: {
    position: 'absolute',
    top: '10%',
    left: 0,
    right: 0,
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    backgroundColor: '#121212',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff'
  },
  closeText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  viewCart: {
    width: 300,
    padding: 15,
    backgroundColor: '#121212',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff'
  },
  viewText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  checkout: {
    marginTop: 10,
    width: 300,
    padding: 15,
    backgroundColor: '#fff',
    alignSelf: 'center'
  },
  checkText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center'
  }
});
