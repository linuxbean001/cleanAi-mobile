import {useNavigation,CommonActions} from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, gql } from '@apollo/client';
import Toast from 'react-native-toast-message';
import Footer from '../Footer';
import Header from '../Header';
import config from './../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const apiEndpoint = `${config.shopifyStoreUrl}/api/${config.apiVersion}/graphql.json`;
  const client = new ApolloClient({
    link: new HttpLink({
      uri: apiEndpoint,
      headers: {
        'X-Shopify-Storefront-Access-Token': config.shopifyStoreFrontApiKey,
      },
    }),
    cache: new InMemoryCache(),
  });
  const LOGIN_CUSTOMER = gql`
    mutation CustomerLogin($email: String!, $password: String!) {
      customerAccessTokenCreate(input: {
        email: $email,
        password: $password
      }) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const handleShopifyLogin = () => {
    setErrors({
      email: '',
      password: ''
    });
    let isValid = true;
    if (!email || !/^\S+@\S+\.\S+/.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email address',
      }));
      isValid = false;
    }
    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Required.',
      }));
      isValid = false;
    }
    if (isValid) {
      client.mutate({
        mutation: LOGIN_CUSTOMER,
        variables: {
          email: email,
          password: password,
        },
      }).then(response => {
        if (response.data.customerAccessTokenCreate.customerAccessToken) {
          const accessToken = response.data.customerAccessTokenCreate.customerAccessToken.accessToken;
          if (accessToken) {
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Logged In Successful',
              text2: 'You have successfully registered!',
            });
            fetchCustomerDetails(accessToken);
          }
        } else {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Login Failed',
            text2: response.data.customerAccessTokenCreate.customerUserErrors[0].message,
          });
        }
      });
    }
  };
  const fetchCustomerDetails = (accessToken) => {
    const GET_CUSTOMER_DETAILS = gql`
      query GetCustomerDetails($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          firstName
          lastName
          email
          defaultAddress {
            id
            address1
            address2
            city
            country
            province
            zip
          }
        }
      }
    `;
    const headers = {
      'X-Shopify-Customer-Access-Token': accessToken,
    };
    client
      .query({
        query: GET_CUSTOMER_DETAILS,
        variables: {
          customerAccessToken: accessToken,
        },
        headers: headers,
      })
      .then(async(response) => {
        const customerDetails = response.data.customer;
        await AsyncStorage.setItem('userDetail', JSON.stringify(customerDetails));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'songs' }],
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <ScrollView>
      <Header />
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Login</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.fields}>
            <TextInput
              style={styles.inputfiield}
              placeholder="Email"
              placeholderTextColor="#000"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={styles.errorText}>{errors.email}</Text>
          </View>
          <View style={styles.fields}>
            <TextInput
              secureTextEntry={true}
              style={styles.inputfiield}
              placeholder="Password"
              placeholderTextColor="#000"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Text style={styles.errorText}>{errors.password}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('forgotPassword')}
          style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Forgot your password ?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShopifyLogin}
          style={styles.signInButton}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.account}
          onPress={() => navigation.navigate('register')}>
          <Text style={styles.textAccount}>create account</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: 380,
    backgroundColor: '#F6F6F6',
  },
  heading: {
    width: 311,
    height: 40,
    top: 20,
    left: 32,
  },
  headingText: {
    fontWeight: '400',
    fontSize: 30,
    textAlign: 'center',
    color: '#121212',
  },
  form: {
    width: 311,
    height: 100,
    left: 52,
    top: 50,
    gap: 15,
  },
  fields: {
    height: 45,
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#121212',
  },
  inputfiield: {
    left: 10,
    color: '#000'
  },
  forgotPassword: {
    height: 20,
    top: 70,
    left: 55,
    textAlign: 'center',
  },
  forgotText: {
    fontSize: 13,
    color: '#121212',
    textDecorationLine: 'underline',
  },
  signInButton: {
    width: 120,
    height: 45,
    top: 90,
    left: 140,
    backgroundColor: '#121212',
  },
  signInText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    top: 12,
    color: '#F6F6F6',
  },
  account: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: 239,
    height: 19,
    top: 110,
    left:70
  },
  textAccount: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 14,
    color: '#5D5D5D',
    textDecorationLine:'underline'
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    position: 'absolute',
    top: 40
  }
});
