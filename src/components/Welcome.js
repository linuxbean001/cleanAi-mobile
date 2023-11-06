import React,{useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Music from '../assets/images/music.png';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Footer from './Footer';
import Header from './Header';
import Filter from './Filter';
import AudioPlayer from './AudioPlayer';

const Welcome = () => {
  const navigation = useNavigation();
  const [filterVisible,setFilterVisible]=useState(false)

  const productData = [
    {
      id: '1',
      url: require('../../music/sample-15s.mp3'),
      title: 'A Sitar Story',
      artist: 'Hanu Dixit',
      artwork: 'cover.png',
      price: 3
    },
    {
      id: '2',
      url: require('../../music/sample-12s.mp3'),
      title: 'Bageshri',
      artist: 'Aditya Verma',
      artwork: 'cover.png',
      price: 2
    },
    {
      id: '3',
      url: require('../../music/sample-15s.mp3'),
      title: 'Dream It',
      artist: 'TrackTribe',
      artwork: 'cover.png',
      price: 5
    },
    {
      id: '4',
      url: require('../../music/sample-6s.mp3'),
      title: 'Flying',
      artist: 'Track Tribe',
      artwork: 'cover.png',
      price: 4
    }
  ];

  return (
    <ScrollView>
      <View>
        <Header />
        <View style={styles.facetsContainer}>
          <Filter filterVisible={filterVisible} setFilterVisible={setFilterVisible}/>
          <View style={styles.facets}>
            <TouchableOpacity 
             onPress={()=>setFilterVisible(true)}
            style={styles.filter}>
              <FontAwesome6 name="sliders" size={20} />
            <Text style={styles.facetsLabel}>Filter and sort</Text>
            </TouchableOpacity>
            <Text style={styles.productCount}>11 products</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          {productData.map((card, index) => (
            <View key={card.id} style={styles.card}>
              <View style={styles.imageContainer}>
                <Image style={styles.cardImage} source={Music} />
              </View>
              <Text style={styles.heading}>{card.title} - {card.artist}</Text>
              <Text style={styles.priceItem}>{card.price} credit</Text>
              <View style={styles.audioContain}>
                <AudioPlayer trackData={card} />
              </View>
              <TouchableOpacity style={styles.creditButton}>
                <Text style={styles.creditButtonText}>Buy Credits</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Footer />
      </View>
    </ScrollView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  facetsContainer: {
    height: 40,
  },
  facets: {
    flexDirection: 'row',
    width: 290,
    height: 30,
  },
  filter: {
    top: 40,
    left: 20,
  },
  facetsLabel: {
    left: 35,
    bottom: 25,
    fontSize: 18,
  },
  productCount: {
    top: 40,
    left: 180,
    fontSize: 14,
  },

  cardContainer: {
    width: 400,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    position: 'relative',
    marginBottom: 80,
  },
  card: {
    width: 180,
  },
  imageContainer: {
    flex: 3,
    top: 60,
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
    top: 80,
    fontSize: 12
  },
  priceItem: {
    flex: 1,
    top: 95,
    fontSize: 16,
  },
  creditButton: {
    flex: 2,
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000000',
    top: 15,
  },
  creditButtonText: {
    textAlign: 'center',
    top: 10,
  },
  audioContain: {
    flex: 2
  }
});
