import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Dummy from '../assets/images/dummy.png';
import PaypalImage from '../assets/images/paypalButton.png';
import PayWithImage from '../assets/images/paywithpaypal.png';
import CreditCard from '../assets/images/creditcard.png';
import PaypalCheck from '../assets/images/paypalcheck1.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import config from './../config/config';
import axios from 'axios';
import Autocomplete from './Autocomplete';
import Music from '../assets/images/music.png';
import Toast from 'react-native-toast-message';
import { CardField } from '@stripe/stripe-react-native';
import { initStripe } from '@stripe/stripe-react-native';

const Checkout = () => {
  const navigation = useNavigation();
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showOrderSummary1, setShowOrderSummary1] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showApartment, setShowApartment] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [check1, setCheck1] = useState(false);
  const [selectedOption, setSelectedOption] = useState('creditCard');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedStateValue, setSelectedStateValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [statesShow, setStatesShow] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [apartMent, setApartMent] = useState('');
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [zipcodeError, setZipcodeError] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    initStripe({ publishableKey: 'pk_test_51HSfFxGaBA9SVqWglCECzecjBajvPdfGGTkT2wxCokkA2jrbJCL2KimgZfPQxxhTEKPY2gV422xoyjaT0u9s4u3000rbX2rTel' });
  }, []);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${config.shopifyStoreUrl}/admin/api/${config.apiVersion}/countries.json`, 
          {
            headers: {
              'X-Shopify-Access-Token': config.shopifyApiKey
            }
          }
        );
        const countriesData = response.data.countries.map(country => ({
          label: country.name,
          value: country.name,
          provinces: country.provinces
        }));
        setCountries(countriesData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
    loadCartItems();
  }, [userDetails]);

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const userDetail = await AsyncStorage.getItem('userDetail');
        if (userDetail) {
          const parsedUser = userDetail ? JSON.parse(userDetail) : {};
          setUserDetails(parsedUser);
          if (!firstName && parsedUser.firstName) {
            setFirstName(parsedUser.firstName);
          }
          if (!lastName && parsedUser.lastName) {
            setLastName(parsedUser.lastName);
          }
          if (!address && parsedUser.defaultAddress && parsedUser.defaultAddress.address1) {
            setAddress(parsedUser.defaultAddress.address1);
          }
          if (!city && parsedUser.defaultAddress && parsedUser.defaultAddress.city) {
            setCity(parsedUser.defaultAddress.city);
          }
          if (!selectedValue && parsedUser.defaultAddress && parsedUser.defaultAddress.country) {
            setSelectedValue(parsedUser.defaultAddress.country);
            handleCountryChange(parsedUser.defaultAddress.country);
          }
          if (!selectedStateValue && parsedUser.defaultAddress && parsedUser.defaultAddress.province) {
            setSelectedStateValue(parsedUser.defaultAddress.province);
          }
          if (!zipcode && parsedUser.defaultAddress && parsedUser.defaultAddress.zip) {
            setZipcode(parsedUser.defaultAddress.zip);
          }
        }
      } catch (error) {
        console.error('Error loading user details:', error);
      }
    };
    loadUserDetails();
  }, [firstName, lastName, address, city, selectedValue, selectedStateValue, zipcode]);

  const handleCountryChange = async (countryCode) => {
    try {
      const selectedCountry = countries.find(country => country.value === countryCode);
      if (selectedCountry) {
        if (selectedCountry.provinces && selectedCountry.provinces.length > 0) {
          const statesData = selectedCountry.provinces.map(province => ({
            label: province.name,
            value: province.name,
          }));
          setStates(statesData);
          setStatesShow(true);
        } else {
          setStatesShow(false);
        }
      }
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

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
  const toggleOrderSummary1 = () => {
    setShowOrderSummary1(!showOrderSummary1);
  };
  const toggleAccount = () => {
    setShowAccount(!showAccount);
  };
  const showApartments = () => {
    setShowApartment(true);
  };
  const logoutAccount = async () => {
    await AsyncStorage.removeItem('userDetail');
    setUserDetails(null)
  };
  const calculateEstimatedTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.count, 0);
  };
  const calculateEstimatedCount = () => {
    return cartItems.reduce((total, item) => total + item.count, 0);
  };

  const initiateCheckout = async () => {
    setLoading(true);
    let orderData;
    const orderApiUrl = `${config.shopifyStoreUrlAudio}/admin/api/${config.apiVersion}/orders.json`;
    const checkoutApiUrl = `${config.shopifyStoreUrl}/admin/api/${config.apiVersion}/checkouts.json`;
    const addressApiUrl = `${config.shopifyStoreUrlAudio}/admin/api/${config.apiVersion}/customers/7616158728494/addresses.json`;
    const headers = {
      'X-Shopify-Access-Token': config.shopifyApiKey,
      'Content-Type': 'application/json',
    };
    try {
      const lineItems = cartItems.map(item => ({
        variant_id: item.card.variants[0].id,
        quantity: item.count,
        title: (item.card && item.card.title) ? item.card.title : item.plan,
        price: Number(item.price).toFixed(2)
      }));
      const checkoutPayload = {
        checkout: {
          line_items: lineItems,
          email: (userDetails) ? userDetails.email : email
        },
      };
      const response = await axios.post(
        checkoutApiUrl,
        checkoutPayload,
        { headers }
      );
      if (response.data) {
        const orderPayload = {
          line_items: lineItems,
          billing_address: {
            first_name: firstName,
            last_name: lastName,
            address1: address,
            address2: apartMent,
            city: city,
            province: selectedStateValue,
            country: selectedValue,
            zip: zipcode
          },
          shipping_address: {
            first_name: firstName,
            last_name: lastName,
            address1: address,
            address2: apartMent,
            city: city,
            province: selectedStateValue,
            country: selectedValue,
            zip: zipcode
          },
          email: (userDetails) ? userDetails.email : email,
          transactions: [
            {
              kind: 'sale',
              amount: cartItems.reduce((total, item) => total + (item.count * Number(item.price)), 0),
              gateway: 'shopify_payments',
            },
          ]
        };
        const response = await axios.post(
          orderApiUrl,
          { order: orderPayload },
          { headers }
        );
        orderData = response.data.order;
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Order Failed',
        text2: 'Failed'
      });
      console.error('Error initiating checkout:', error);
    } finally {
      setLoading(false);
      if (orderData) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Order created successfully',
          text2: 'You have successfully ordered!',
        });
        navigation.navigate('confirm', { orders: orderData });
      }
    }
  };

  const handlePayNow = () => {
    let errors = {};
    if (userDetails === null) {
      if (!email.trim()) {
        errors.email = 'Enter an email or phone number';
      }
    }
    if (!lastName.trim()) {
      errors.lastName = 'Enter a last name';
    }
    if (!address.trim()) {
      errors.address = 'Enter an address';
    }
    if (!city.trim()) {
      errors.city = 'Enter a city';
    }
    if (!zipcode.trim()) {
      errors.zipcode = 'Enter a ZIP / postal code';
    }
    if (Object.keys(errors).length > 0) {
      setEmailError(errors.email || '');
      setLastNameError(errors.lastName || '');
      setAddressError(errors.address || '');
      setCityError(errors.city || '');
      setZipcodeError(errors.zipcode || '');
      return;
    } else {
      if (selectedOption === 'paypal') {
        navigation.navigate('paypal', { paypalPrice: calculateEstimatedTotal() })
      } else if (selectedOption === 'creditCard') {
        initiateCheckout();
      }
    }
  };
  return (
    <>
      {loading ? (
        <><View style={styles.loadContainer}>
          <ActivityIndicator size="large" color="#abaf51" />
          <Text style={styles.loadText}>Please wait...</Text>
        </View></>
      ) : (
      <><ScrollView>
        <View style={styles.cardTop}>
          <Text style={styles.yourCart}>VRenity</Text>
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
          {userDetails ? (<><View>
            <TouchableOpacity style={styles.account} onPress={toggleAccount}>
              <View>
                <Text style={styles.orderSummary}>
                  Account
                </Text>
              </View>
              <FontAwesome6 name={showAccount ? 'chevron-up' : 'chevron-down'} color="#abaf51" size={12} />
            </TouchableOpacity>
            <View style={styles.userDetails}>
              <Text style={styles.userEmail}>{userDetails.email}</Text>
            </View>
            {showAccount && (
              <View>
                <TouchableOpacity onPress={logoutAccount}>
                  <Text style={styles.userLogout}>Log out</Text>
                </TouchableOpacity>
              </View>
            )}
          </View></>) :
          (<><View style={styles.cardContact}>
            <Text style={styles.contactText}>Contact</Text>
            <Text style={styles.loginText}>Have an account?
              <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                <Text style={styles.loginText1}>Log in</Text>
              </TouchableOpacity>
            </Text>
          </View>
          <View>
            <TextInput
              style={[
                styles.inputField,
                { borderColor: emailError ? 'red' : '#ddd' }
              ]}
              placeholder="Email or mobile phone number"
              placeholderTextColor="#000"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError('');
              }}
            />
            {emailError ? (
              <Text style={styles.errorOuterText}>{emailError}</Text>
            ) : null}
          </View></>)}
          <View>
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
              title={
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, left: 5, fontWeight: '500', color: '#000' }}>Credit Card</Text>
                  <Image source={CreditCard} style={{ right: 30 }}/>
                </View>
              }
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
                <CardField
                  postalCodeEnabled={false}
                  placeholders={{
                    number: 'Card Number',
                  }}
                  cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                  }}
                  style={{
                    width: '100%',
                    height: 50
                  }}
                  onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);
                  }}
                  onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                  }}
                />
              </View>
            )}
          </View>
          <View style={styles.cardPaymentSection}>
            <Text style={styles.billingText}>Billing address</Text>
          </View>
          <View style={styles.billingDetails}>
            <View style={styles.countryBox}>
              <Picker
                style={{ height: 50, width: 380, color: '#000' }}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedValue(itemValue);
                  handleCountryChange(itemValue);
                }}
              >
                {countries.map((country, index) => (
                  <Picker.Item key={index} label={country.label} value={country.value} />
                ))}
              </Picker>
            </View>
            <TextInput
              style={styles.inputFieldBill}
              placeholder="First name (optional)"
              placeholderTextColor="#000"
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
              }}
            />
            <TextInput
              style={[
                styles.inputFieldBill,
                { borderColor: lastNameError ? 'red' : '#ddd' }
              ]}
              placeholder="Last name"
              placeholderTextColor="#000"
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                setLastNameError('');
              }}
            />
            {lastNameError ? (
              <Text style={styles.errorOuterBillText}>{lastNameError}</Text>
            ) : null}
            <TextInput
              style={[
                styles.inputFieldBill,
                { borderColor: addressError ? 'red' : '#ddd' }
              ]}
              placeholder="Address"
              placeholderTextColor="#000"
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                setAddressError('');
              }}
            />
            {addressError ? (
              <Text style={styles.errorOuterBillText}>{addressError}</Text>
            ) : null}
            {!showApartment ? (<><View style={styles.apartment}>
              <TouchableOpacity onPress={showApartments}>
                <FontAwesome6 name='plus' color="#abaf51" size={12} />
                <View style={styles.apartText}>
                  <Text style={styles.apartSummary}>
                    Add apartment, suite, etc.
                  </Text>
                </View>
              </TouchableOpacity>
            </View></>) : (
              <TextInput
                style={[
                  styles.inputFieldBill
                ]}
                placeholder="Apartment, suite, etc. (optional)"
                placeholderTextColor="#000"
                value={apartMent}
                onChangeText={(text) => {
                  setApartMent(text);
                }}
              />
            )}
            <TextInput
              style={[
                styles.inputFieldBill,
                { borderColor: cityError ? 'red' : '#ddd' }
              ]}
              placeholder="City"
              placeholderTextColor="#000"
              value={city}
              onChangeText={(text) => {
                setCity(text);
                setCityError('');
              }}
            />
            {cityError ? (
              <Text style={styles.errorOuterBillText}>{cityError}</Text>
            ) : null}
            {statesShow ? (
              <View style={styles.countryBox}>
                <Picker
                  style={{ height: 50, width: 380, color: '#000'}}
                  selectedValue={selectedStateValue}
                  onValueChange={(itemValue, itemIndex) => setSelectedStateValue(itemValue)}
                >
                  {states.map((state, index) => (
                    <Picker.Item key={index} label={state.label} value={state.value} />
                  ))}
                </Picker>
              </View>
            ) : null}
            <TextInput
              style={[
                styles.inputFieldBill,
                { borderColor: zipcodeError ? 'red' : '#ddd' }
              ]}
              placeholder="ZIP code"
              placeholderTextColor="#000"
              value={zipcode}
              onChangeText={(text) => {
                setZipcode(text);
                setZipcodeError('');
              }}
            />
            {zipcodeError ? (
              <Text style={styles.errorOuterBillText}>{zipcodeError}</Text>
            ) : null}
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
            </View>
          )}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}><Text style={styles.amountUsd}>USD</Text> ${calculateEstimatedTotal().toFixed(2)}</Text>
          </View>
          <View style={styles.paymentBtn}>
            {selectedOption === 'creditCard' ? (
              <TouchableOpacity
                onPress={handlePayNow}
                style={styles.shoppingBtn}>
                <Text style={styles.shoppingText}>Pay now</Text>
              </TouchableOpacity>
            ) : <TouchableOpacity
                  onPress={handlePayNow}
                >
                  <Image style={styles.selectPayWithBtn} source={PayWithImage} />
                </TouchableOpacity>}
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.footerText}>All rights reserved VRenity</Text>
        </View>
      </ScrollView></>
      )}
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
    color: '#000'
  },
  itemBadge: {
    fontSize: 12,
    color: '#abaf51',
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
    color: '#000',
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
    borderColor: '#ddd',
    color: '#000'
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
    textAlign: 'center',
    color: '#000'
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
    backgroundColor: 'white',
    color: '#000'
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
    backgroundColor: 'white',
    color: '#000'
  },
  countryBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 5,
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
  selectPayWithBtn: {
    width: 380,
    height: 60,
    alignSelf: 'center'
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 15,
    alignSelf: 'flex-start'
  },
  errorOuterText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 15,
    alignSelf: 'flex-start'
  },
  errorOuterBillText: {
    color: 'red',
    fontSize: 14,
    width: 380
  },
  account: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userDetails: {
    flex: 1,
    textAlign: 'center'
  },
  userEmail: {
    paddingLeft: 15,
    fontSize: 20,
    color: '#000'
  },
  userLogout: {
    paddingLeft: 15,
    paddingTop: 5,
    fontSize: 16,
    color: '#abaf51',
    textDecorationLine: 'underline'
  },
  apartment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'flex-start',
    padding: 15,
    marginLeft: 5
  },
  apartText: {
    position: 'absolute',
    width: 300,
    left: 14,
    top: -6
  },
  apartSummary: {
    fontSize: 16,
    color: '#abaf51'
  },
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadText: {
    fontSize: 20,
    color: '#abaf51'
  }
});

export default Checkout;
