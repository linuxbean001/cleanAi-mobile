import React from 'react';
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
import Logo from '../assets/images/logo.png';

import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Footer from './Footer';

const Welcome = () => {
  const navigation = useNavigation();

  const card = [
    {title: 'A Sitar Story - Hanu Dixit'},
    {title: 'A Sitar Story - Hanu Dixit'},
    {title: 'A Sitar Story - Hanu Dixit'},
    {title: 'A Sitar Story - Hanu hanu dixit Dixit'},
    {title: 'A Sitar Story - Hanu Dixit'},
    {title: 'A Sitar Story - Hanu Dixit'},
    {title: 'A Sitar Story - Hanu Dixit'},
    {title: 'A Sitar Story - Hanu Dixit'},
  ];

  return (
    <ScrollView>
      <View>
        <View style={styles.header}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.sidebarIcon}
              // onPress={() => setMenuVisible(true)}
            >
              <FeatherIcon name="menu" size={20} color={'#FFFFFF'} />
            </TouchableOpacity>
            <Image source={Logo} style={styles.logo} />
            <View style={styles.searchIcon}>
              <FeatherIcon name="search" size={20} color={'#FFFFFF'} />
            </View>
            <View style={styles.searchIcon}>
              <FeatherIcon name="shopping-bag" size={20} color={'#FFFFFF'} />
            </View>
          </View>
        </View>

        <View style={styles.facetsContainer}>
          <View style={styles.facets}>
            <View style={styles.filter}>
              <FontAwesome6 name="sliders" size={20} />
            </View>
            <Text style={styles.facetsLabel}>Filter and sort</Text>
            <Text style={styles.productCount}>11 products</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          {card.map((card, index) => (
            <View style={styles.card}>
              <View style={styles.imageContainer}>
                <Image style={styles.cardImage} source={Music} />
              </View>
              <Text style={styles.heading}>{card.title}</Text>
              <Text style={styles.priceItem}>3 credit</Text>
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
  header: {
    height: 75,
    width: '100%',
    backgroundColor: '#121212',
  },
  sidebarIcon: {
    width: 40,
    height: 40,
    top: 29,
    left: 25,
  },
  logo: {
    width: 170,
    height: 50,
    top: 10,
    left: 60,
  },
  searchIcon: {
    width: 40,
    height: 40,
    top: 30,
    left: 100,
  },
  facetsContainer: {
    height: 40,
  },
  facets: {
    flexDirection: 'row',
    width: 290,
    height: 30,
  },
  filter: {
    top: 50,
    left: 20,
  },
  facetsLabel: {
    left: 35,
    top: 47,
    fontSize: 18,
  },
  productCount: {
    top: 50,
    left: 180,
    fontSize: 14,
  },

  cardContainer: {
    width: 400,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    position: 'relative',
    marginBottom: 100,
  },
  card: {
    height: 300,
    width: 180,
  },
  imageContainer: {
    top: 60,
    left: 40,
  },
  cardImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  heading: {
    top: 100,
    left: 20,
    fontSize: 12,
    height: 30,
  },
  priceItem: {
    top: 105,
    left: 20,
    fontSize: 16,
  },
  creditButton: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000000',
    top: 140,
  },
  creditButtonText: {
    textAlign: 'center',
    top: 10,
  },
});
