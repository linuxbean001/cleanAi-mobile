import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Music from '../assets/images/music.png';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Footer from './Footer';
import Header from './Header';
import Filter from './Filter';
import AudioPlayer from './AudioPlayer';

const Welcome = () => {
  const navigation = useNavigation();
  const [productData, setProductData] = useState([]);
  const [filterVisible,setFilterVisible]=useState(false)
  const shopifyApiKey = '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';
  const shopifyStoreUrl = 'https://clean-ai.myshopify.com';
  const apiVersion = '2023-07';
  useEffect(() => {
    const endpoint = `/admin/api/${apiVersion}/products.json`;
    axios
      .get(`${shopifyStoreUrl}${endpoint}`, {
        headers: {
          'X-Shopify-Access-Token': shopifyApiKey,
        },
      })
      .then(async (response) => {
        if (response.data.products) {
          const products = response.data.products;

          // Fetch metafields for each product
          const productsWithMetafields = await Promise.all(
            products.map(async (product) => {
              const metafieldsEndpoint = `/admin/api/${apiVersion}/products/${product.id}/metafields.json`;
              const metafieldsResponse = await axios.get(
                `${shopifyStoreUrl}${metafieldsEndpoint}`,
                {
                  headers: {
                    'X-Shopify-Access-Token': shopifyApiKey,
                  },
                }
              );
              product.metafields = metafieldsResponse.data.metafields;
              return product;
            })
          );

          setProductData(productsWithMetafields);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

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
            <Text style={styles.productCount}>{productData.length} products</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          {productData.map((card, index) => (
            <View key={card.id} style={styles.card}>
              <View style={styles.imageContainer}>
                {card.image && card.image.src ? (
                  <Image style={styles.cardImage} source={{ uri: card.image.src }} />
                ) : (
                  <Image style={styles.cardImage} source={Music} />
                )}
              </View>
              <Text style={styles.heading}>{card.title}</Text>
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
