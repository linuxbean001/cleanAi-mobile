import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import CartEmpty from './CartEmpty';
import Paypal from './Paypal';
import Delete from '../assets/images/delete.jpg';
import PaypalImage from '../assets/images/paypalButton.png';
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

  const handleDelete = async (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    await saveCartItems(updatedCartItems);
  };
  
  const calculateEstimatedTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.count, 0);
  };
  return (
    <>
      <ScrollView>
        <Header/>
          {cartItems.length > 0 ? (<><View style={styles.cardTop}>
            <Text style={styles.yourCart}>Your cart</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('songs')}>
              <Text style={styles.continue}>Continue shopping</Text>
            </TouchableOpacity>
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
                <TouchableOpacity onPress={() => handleDelete(index)} style={styles.buttonDelete}>
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
          <View style={styles.cardBottom}>
            <Text style={styles.estimatedTotal}>Estimated total</Text>
            <Text style={styles.totalCrd}>{calculateEstimatedTotal()} Credit</Text>
          </View>
          <View style={styles.cardBottomText}>
            <Text>Taxes, discounts and shipping calculated at checkout</Text>
          </View>
          <View style={styles.cardBottomText1}>
            <Text style={styles.bottomText1}>Please apply credits to Download this song (if available into your AC), click on credit button</Text>
          </View>
          <View style={styles.cardPayBtn}>
            <TouchableOpacity
              onPress={()=>navigation.navigate('checkout')}
              style={styles.selectPayBtn}>
              <Text style={styles.selectPayText}>Check out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>navigation.navigate('paypal', { paypalPrice: calculateEstimatedTotal() })}
            >
              <Image style={styles.selectPaypalBtn} source={PaypalImage} />
            </TouchableOpacity>
          </View></>) : (<><CartEmpty/></>)}
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
    fontSize: 17,
    textDecorationLine: 'underline'
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
  },
  cardBottom: {
    padding: 35,
    marginTop: -30,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  estimatedTotal: {
    fontSize: 18,
    color: '#000'
  },
  totalCrd: {
    marginLeft: 20,
    fontSize: 15
  },
  cardBottomText: {
    marginTop: -20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 16,
    color: '#000'
  },
  cardBottomText1: {
    marginTop: -10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomText1: {
    fontSize: 17,
    color: '#000'
  },
  cardPayBtn: {
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 35
  },
  selectPayBtn: {
    width: 350,
    padding: 15,
    backgroundColor: '#121212',
    alignSelf: 'center',
    borderRadius: 50
  },
  selectPayText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  selectPaypalBtn: {
    width: 570,
    height: 80,
    alignSelf: 'center'
  }
});

export default Cart;
