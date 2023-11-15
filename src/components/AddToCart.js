import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Footer from './Footer';

const AddToCart = ({route, navigation}) => {
  const { price, plan } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-300)).current;
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadCartCount();
  }, []);

  const loadCartCount = async () => {
    try {
      const storedCartCount = await AsyncStorage.getItem('cartCount');
      setCartCount(parseInt(storedCartCount) || 0);
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
  };

  const saveCartCount = async (newCartCount) => {
    try {
      await AsyncStorage.setItem('cartCount', newCartCount.toString());
      setCartCount(newCartCount);
    } catch (error) {
      console.error('Error saving cart count:', error);
    }
  };

  const toggleModal = () => {
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
    } else {
      const newCartCount = cartCount + 1;
      saveCartCount(newCartCount);
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
    }
  };
  return (
    <>
      <ScrollView>
        <Header />
        <View style={styles.addtocard}>
          <View style={styles.cardTop}>
            <Text style={styles.title}>{plan}</Text>
          </View>
          <View style={styles.priceText}>
             <Text style={styles.price}>{price} credit</Text>
          </View>
          <View style={styles.cardBtn}>
            <TouchableOpacity 
              onPress={toggleModal}
              style={styles.selectBtn}>
              <Text style={styles.selectText}>Add to cart</Text>
            </TouchableOpacity>
          </View>
          <Animated.View
            style={[
              styles.modal,
              {
                opacity,
                transform: [{ translateY }],
              },
            ]}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Item added to your cart</Text>
              <Text style={styles.modalText}>{plan}</Text>
              <TouchableOpacity
                style={styles.viewCart}>
                <Text style={styles.viewText}>View cart ({cartCount})</Text>
              </TouchableOpacity>
              <TouchableOpacity
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
        </View>
        <Footer />
      </ScrollView>
    </>    
  );
};
const styles = StyleSheet.create({
  addtocard: {
    margin: 20
  },
  cardTop: {
    padding: 20
  },
  title: {
    fontSize: 45,
    color: '#000',
    textAlign: 'center'
  },
  priceText: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
    textAlign: 'center',
    alignSelf: 'center'
  },
  price: {
    fontSize: 20,
    color: '#000'
  },
  cardBtn: {
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 35
  },
  selectBtn: {
    width: 300,
    padding: 15,
    backgroundColor: '#121212',
    alignSelf: 'center'
  },
  selectText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  modal: {
    position: 'absolute',
    top: '-8%',
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

export default AddToCart;
