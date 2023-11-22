import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Dummy from '../assets/images/dummy.png';
import PaypalImage from '../assets/images/paypalButton.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

const Checkout = () => {
  const navigation = useNavigation();
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showOrderSummary1, setShowOrderSummary1] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [check1, setCheck1] = useState(false);
  const [selectedOption, setSelectedOption] = useState('creditCard');
  const [selectedValue, setSelectedValue] = useState('');
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
  const toggleOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };
  const toggleOrderSummary1 = () => {
    setShowOrderSummary1(!showOrderSummary1);
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
          <Text style={styles.yourCart}>Clean AI</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('cart')}>
            <FontAwesome6 style={styles.shoppingBag} name="bag-shopping" color="#abaf51" size={20} />
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
                  <Image source={Dummy} style={styles.itemImage} />
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
          <View style={styles.cardExpress}>
            <Text style={styles.yourCartText}>Express checkout</Text>
          </View>
          <View style={styles.cardEmptyBtn}>
            <TouchableOpacity
              onPress={()=>navigation.navigate('paypal', { paypalPrice: calculateEstimatedTotal() })}
            >
              <Image style={styles.selectPaypalBtn} source={PaypalImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.orContainer}>
            <View style={styles.orBorder} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orBorder} />
          </View>
          <View style={styles.cardContact}>
            <Text style={styles.contactText}>Contact</Text>
            <Text style={styles.loginText}>Have an account?
              <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                <Text style={styles.loginText1}>Log in</Text>
              </TouchableOpacity>
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.inputField}
              placeholder="Email or mobile phone number"
            />
            <CheckBox
              checked={check1}
              onPress={() => setCheck1(!check1)}
              title="Email me with news and offers"
              titleProps={{ style: styles.checkboxTitle }}
            />
          </View>
        </View>
        <View style={styles.cardPayment}>
          <View style={styles.cardPaymentSection}>
            <Text style={styles.paymentText}>Payment</Text>
            <Text style={styles.transText}>All transactions are secure and encrypted.</Text>
          </View>
          <View>
            <CheckBox
              title="Credit Card"
              checked={selectedOption === 'creditCard'}
              onPress={() => setSelectedOption('creditCard')}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#abaf51"
              uncheckedColor="#e5e5e5"
              containerStyle={{
                backgroundColor: selectedOption === 'creditCard' ? '#f7f8e5' : 'white',
                borderColor: selectedOption === 'creditCard' ? '#abaf51' : '#e5e5e5',
                borderWidth: 2
              }}
            />
            {selectedOption === 'creditCard' && (
              <View style={styles.additionalDetails}>
                <TextInput
                  style={styles.inputFieldCard}
                  placeholder="Card number"
                />
                <TextInput
                  style={styles.inputFieldCard}
                  placeholder="Expiration date (MM / YY)"
                />
                <TextInput
                  style={styles.inputFieldCard}
                  placeholder="Security code"
                />
                <TextInput
                  style={styles.inputFieldCard}
                  placeholder="Name on card"
                />
              </View>
            )}
            <CheckBox
              title="PayPal"
              checked={selectedOption === 'paypal'}
              onPress={() => setSelectedOption('paypal')}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#abaf51"
              uncheckedColor="#e5e5e5"
              containerStyle={{
                backgroundColor: selectedOption === 'paypal' ? '#f7f8e5' : 'white',
                borderColor: selectedOption === 'paypal' ? '#abaf51' : '#e5e5e5',
                borderWidth: 2
              }}
            />
            {selectedOption === 'paypal' && (
              <View style={styles.additionalDetails}>
                <Text style={styles.additionalDetailsText}>After clicking "Pay with PayPal", you will be redirected to PayPal to complete your purchase securely.</Text>
              </View>
            )}
          </View>
          <View style={styles.cardPaymentSection}>
            <Text style={styles.billingText}>Billing address</Text>
          </View>
          <View style={styles.billingDetails}>
            <View style={styles.countryBox}>
              <Picker
                style={{ height: 50, width: 380 }}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Country/Region" value="" />
                <Picker.Item label="Option 1" value="option1" />
                <Picker.Item label="Option 2" value="option2" />
                <Picker.Item label="Option 3" value="option3" />
              </Picker>
            </View>
            <TextInput
              style={styles.inputFieldBill}
              placeholder="First name (optional)"
            />
            <TextInput
              style={styles.inputFieldBill}
              placeholder="Last name"
            />
            <TextInput
              style={styles.inputFieldBill}
              placeholder="Address"
            />
            <TextInput
              style={styles.inputFieldBill}
              placeholder="City"
            />
            <View style={styles.countryBox}>
              <Picker
                style={{ height: 50, width: 380 }}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="State" value="" />
                <Picker.Item label="Option 1" value="option1" />
                <Picker.Item label="Option 2" value="option2" />
                <Picker.Item label="Option 3" value="option3" />
              </Picker>
            </View>
            <TextInput
              style={styles.inputFieldBill}
              placeholder="ZIP code"
            />
          </View>
        </View>
        <View style={styles.cardPayment}>
          <View style={styles.shopOrders}>
            <Text style={styles.paymentText}>Order summary ({calculateEstimatedCount()})</Text>
            <TouchableOpacity onPress={toggleOrderSummary1}>
              <View>
                <Text style={styles.orderSummary}>
                  {showOrderSummary1 ? 'Hide' : 'Show'}{' '}
                  <FontAwesome6 name={showOrderSummary1 ? 'chevron-up' : 'chevron-down'} color="#abaf51" size={12} />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {showOrderSummary1 && (
            <View>
              {cartItems.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={styles.itemImageContainer}>
                    <Image source={Dummy} style={styles.itemImage} />
                    <Text style={styles.itemCount}>{item.count}</Text>
                  </View>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.plan}</Text>
                  </View>
                  <Text style={styles.itemPrice}>${Number(item.price * item.count).toFixed(2)}</Text>
                </View>
              ))}
            </View>
          )}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}><Text style={styles.amountUsd}>USD</Text> ${calculateEstimatedTotal().toFixed(2)}</Text>
          </View>
          <View style={styles.paymentBtn}>
            <TouchableOpacity
              style={styles.shoppingBtn}>
              <Text style={styles.shoppingText}>Pay now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.footerText}>All rights reserved Clean AI</Text>
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
  yourCart: {
    fontSize: 28,
    color: '#000'
  },
  shoppingBag: {
    marginTop: 10
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
    fontWeight: 'bold',
  },
  itemBadge: {
    fontSize: 12,
    color: '#abaf51',
  },
  itemPrice: {
    fontSize: 16
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
  cardExpress: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  yourCartText: {
    fontSize: 17,
    color: '#000',
    fontWeight: 'normal',
  },
  cardEmptyBtn: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selectPaypalBtn: {
    width: 570,
    height: 80,
    alignSelf: 'center'
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  orBorder: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    fontSize: 16,
    color: '#abaf51',
    paddingHorizontal: 16,
  },
  cardContact: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contactText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000'
  },
  loginText: {
    fontSize: 15
  },
  loginText1: {
    marginLeft: 5,
    fontSize: 15,
    color: '#abaf51',
    textDecorationLine: 'underline'
  },
  inputField: {
    height: 50,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#ddd'
  },
  checkboxTitle: {
    color: '#000',
    fontWeight: 'normal',
    marginLeft: 5
  },
  cardPayment: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingBottom: 15
  },
  cardPaymentSection: {
    marginLeft: 10,
    padding: 10
  },
  paymentText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000'
  },
  transText: {
    marginTop: 5,
    fontSize: 16,
    color: '#000'
  },
  additionalDetails: {
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 0.3,
    borderColor: 'gray',
    marginTop: -5,
    marginLeft: 11,
    marginRight: 11
  },
  additionalDetailsText: {
    textAlign: 'center'
  },
  inputFieldCard: {
    width: 350,
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#ddd',
    backgroundColor: 'white'
  },
  billingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  billingDetails: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputFieldBill: {
    width: 380,
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#ddd',
    backgroundColor: 'white'
  },
  countryBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5,
    borderRadius: 5
  },
  shopOrders: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  }
});

export default Checkout;
