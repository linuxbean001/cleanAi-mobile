import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Logo from '../assets/images/PNG/H_Sound_Trans_Gold_Logo.png';
import Header from './Header';
import Footer from './Footer';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Dummy from '../assets/images/dummy.png';
import PaypalImage from '../assets/images/paypalButton.png';
import PayWithImage from '../assets/images/paywithpaypal.png';
import CreditCard from '../assets/images/creditcard.png';
import PaypalCheck from '../assets/images/paypalcheck1.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox, Card } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import config from './../config/config';
import axios from 'axios';
import Autocomplete from './Autocomplete';
import Music from '../assets/images/music.png';
import Toast from 'react-native-toast-message';
import { CardField } from '@stripe/stripe-react-native';
import { initStripe } from '@stripe/stripe-react-native';

const Checkout = ({ route }) => {
  const ordersData = route.params
  const navigation = useNavigation();
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [check1, setCheck1] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
      setCartItems(parsedCartItems);
      const userDetail = await AsyncStorage.getItem('userDetail');
      if (userDetail) {
        const parsedUser = userDetail ? JSON.parse(userDetail) : {};
        setUserDetails(parsedUser);
      }
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
  };
  const toggleOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };
  const calculateEstimatedTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.count, 0);
  };
  const calculateEstimatedCount = () => {
    return cartItems.reduce((total, item) => total + item.count, 0);
  };
  return (
    <>
      <ScrollView>
        <View style={styles.cardTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Logo} style={styles.logo} />
          </TouchableOpacity>  
        </View>
        <View style={styles.shopPrices}>
          <TouchableOpacity onPress={toggleOrderSummary}>
            <View>
              <Text style={styles.orderSummary}>
                {showOrderSummary ? 'Hide order summary' : 'Show order summary'}{' '}
                <FontAwesome6 name={showOrderSummary ? 'chevron-up' : 'chevron-down'} color="#abaf51" size={12} />
              </Text>
            </View>
          </TouchableOpacity>  
          <Text style={styles.orderTotal}>${calculateEstimatedTotal().toFixed(2)}</Text>
        </View>
        {showOrderSummary && (
          <View>
            {cartItems.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.itemImageContainer}>
                  {item.card.image && item.card.image.src ? (
                    <Image style={styles.itemImage} source={{ uri: item.card.image.src }} />
                  ) : item.card.image === null ? (
                    <Image source={Dummy} style={styles.itemImage} />
                  ) : (
                    <Image style={styles.itemImage} source={Music} />
                  )}
                  <Text style={styles.itemCount}>{item.count}</Text>
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.plan}</Text>
                </View>
                <Text style={styles.itemPrice}>${Number(item.price * item.count).toFixed(2)}</Text>
              </View>
            ))}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}><Text style={styles.amountUsd}>USD</Text> ${calculateEstimatedTotal().toFixed(2)}</Text>
            </View>
          </View>
        )}
        <View style={styles.cardExpTop}>
          <View style={styles.orderDetails}>
            <View style={styles.orderRight}>
              <FontAwesome6 name='check-circle' color="#abaf51" size={50} />
            </View>
            <View>
              <Text style={styles.orderConfirm}>Confirmation #{ordersData.orders.confirmation_number}</Text>
              {userDetails ? (
                <Text style={styles.orderUser}>Thank you, {userDetails.firstName}!</Text>
              ) : (
                <></>
              )}
            </View>
          </View>
          <View>
            <Card>
              <Text style={{marginBottom: 10, fontSize: 20, color: '#000'}}>
                Your order is confirmed.
              </Text>
              <Text style={{marginBottom: 10, fontSize: 16, color: '#000'}}>
                You’ll receive a confirmation email with your order number shortly.
              </Text>
              {userDetails && !userDetails.acceptsMarketing ? (
                <CheckBox
                  checked={check1}
                  onPress={() => setCheck1(!check1)}
                  title="Email me with news and offers"
                  titleProps={{ style: styles.checkboxTitle }}
                />
              ):(
                <></>
              )}
            </Card>
            <Card>
              <Text style={{marginBottom: 10, fontSize: 20, color: '#000'}}>
                Order details
              </Text>
              <Text style={{marginBottom: 10, fontSize: 16, color: '#000'}}>
                Contact information
              </Text>
              {userDetails ? (
                <Text style={{marginBottom: 10, fontSize: 15, color: '#000'}}>
                  {userDetails.email}
                </Text>
              ) : (
                <></>
              )}
              <View style={ styles.paymentMethod }>
                <Text style={{marginBottom: 10, fontSize: 16, color: '#000'}}>
                  Payment method
                </Text>
                <View style={ styles.paymentMethodText }>
                  <Image source={CreditCard}/>
                  <Text style={{marginLeft: 10, marginBottom: 10, fontSize: 16, color: '#000'}}>
                     ending with {calculateEstimatedCount()} - ${calculateEstimatedTotal().toFixed(2)}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{marginBottom: 10, fontSize: 16, color: '#000'}}>
                  Billing address
                </Text>
                <View>
                  <Text style={ styles.billingAddressText }>
                    {ordersData.orders.billing_address.name}
                  </Text>
                  <Text style={ styles.billingAddressText }>
                    {ordersData.orders.billing_address.address1}
                  </Text>
                  <Text style={ styles.billingAddressText }>
                    {ordersData.orders.billing_address.city} {ordersData.orders.billing_address.province} {ordersData.orders.billing_address.zip}
                  </Text>
                  <Text style={ styles.billingAddressText }>
                    {ordersData.orders.billing_address.country}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
        <View style={styles.cardPayment}>
          <TouchableOpacity
            onPress={()=>navigation.navigate('songs')}
            style={styles.shoppingBtn}>
            <Text style={styles.shoppingText}>Continue shopping</Text>
          </TouchableOpacity>
          <View style={styles.cardNeed}>
            <Text style={styles.needText}>Need help? Contact us</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.footerText}>All rights reserved VRenity</Text>
        </View>
      </ScrollView>
    </> 
  );
};
const styles = StyleSheet.create({
  cardTop: {
    marginTop: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    borderBottomStyle: 'solid'
  },
  shopPrices: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ebeced'
  },
  orderSummary: {
    fontSize: 16,
    color: '#abaf51'
  },
  orderTotal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  itemImageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 16
  },
  itemCount: {
    position: 'absolute',
    top: -10,
    right: 12,
    backgroundColor: '#4b4c4d',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 50,
    fontSize: 14
  },
  itemDetails: {
    flex: 1,
    marginRight: 16,
  },
  itemName: {
    fontSize: 16,
    color: '#000'
  },
  itemPrice: {
    fontSize: 16,
    color: '#000'
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  amountUsd: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#000'
  },
  cardExpTop: {
    backgroundColor: 'white',
    paddingBottom: 15
  },
  checkboxTitle: {
    color: '#000',
    fontWeight: 'normal',
    marginLeft: 5
  },
  cardPayment: {
    backgroundColor: 'white',
    paddingBottom: 15
  },
  billingAddressText: {
    fontSize: 15,
    color: '#000'
  },
  shoppingBtn: {
    width: 380,
    padding: 15,
    backgroundColor: '#abaf51',
    alignSelf: 'center',
    borderRadius: 5
  },
  shoppingText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  cardFooter: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.3,
    borderBottomColor: '#ccc',
    borderBottomStyle: 'solid',
    backgroundColor: 'white'
  },
  footerText: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    color: '#000'
  },
  cardNeed: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  needText: {
    paddingTop: 10,
    fontSize: 15,
    color: '#000'
  },
  orderDetails: {
    flexDirection: 'row',
    alignContent: 'flex-start'
  },
  orderRight: {
    marginTop: 18,
    marginLeft: 15
  },
  orderConfirm: {
    paddingLeft: 15,
    paddingTop: 15,
    fontSize: 16,
    color: '#000'
  },
  orderUser: {
    paddingLeft: 15,
    paddingTop: 5,
    fontSize: 20,
    color: '#000'
  },
  logo: {
    width: 130,
    height: 50,
    right: 10
  },
  paymentMethod: {
    marginTop: 20,
    marginBottom: 20
  },
  paymentMethodText: {
    flexDirection: 'row',
    alignContent: 'flex-start'
  }
});

export default Checkout;
