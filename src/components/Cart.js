import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import Delete from '../assets/images/delete.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ title, description, price }) => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
      setCartItems(parsedCartItems);
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
  };
  const saveCartItems = async (updatedCartItems) => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error saving cart items:', error);
    }
  };

  const handleIncrement = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].count += 1;
    saveCartItems(updatedCartItems);
  };

  const handleDecrement = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].count > 1) {
      updatedCartItems[index].count -= 1;
      saveCartItems(updatedCartItems);
    }
  };

  const handleCountChange = (index, newCount) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].count = newCount;
    saveCartItems(updatedCartItems);
  };
  return (
    <>
      <ScrollView>
        <Header/>
          <View style={styles.cardTop}>
            <Text style={styles.yourCart}>Your cart</Text>
            <Text style={styles.continue}>Continue shopping</Text>
          </View>
          <View style={styles.cardTopSecond}>
            <Text style={styles.productTotal}>Product</Text>
            <Text style={styles.productTotal}>Total</Text>
          </View>
          <View style={styles.cardThird}></View>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.cardForth}>
              <View>
                <Text style={styles.productName}>{item.plan}</Text>
                <Text style={styles.productCrd}>{item.price} Credit</Text>
                <TouchableOpacity style={styles.buttonDelete}>
                  <Image style={styles.deleteImage} source={Delete} />
                </TouchableOpacity>
                <View style={styles.container}>
                  <TouchableOpacity onPress={() => handleDecrement(index)} style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    value={item.count.toString()}
                    onChangeText={(newCount) => handleCountChange(index, parseInt(newCount, 10))}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity onPress={() => handleIncrement(index)} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.productTotal}>{item.price * item.count} Credit</Text>
            </View>
          ))}
          <View style={styles.cardFifth}></View>
        <Footer/>
      </ScrollView>
    </> 
  );
};
const styles = StyleSheet.create({
  cardTop: {
    marginTop: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardTopSecond: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardForth: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  yourCart: {
    fontSize: 28,
    color: '#000'
  },
  continue: {
    marginTop: 10,
    fontSize: 17
  },
  productTotal: {
    marginTop: 10,
    fontSize: 15
  },
  productName: {
    marginTop: 10,
    marginLeft: 60,
    fontSize: 15,
    color: '#000'
  },
  productCrd: {
    marginTop: 10,
    marginLeft: 60,
    fontSize: 13,
    color: '#000'
  },
  cardThird: {
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  cardFifth: {
    marginTop: 30,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 15,
    marginLeft: 60
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  buttonText: {
    fontSize: 24,
    color: '#000'
  },
  input: {
    marginHorizontal: 30,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  buttonDelete: {
    position: 'absolute',
    left: 240,
    top: 85
  },
  deleteImage: {
    width: 28,
    height: 28
  }
});

export default Cart;
