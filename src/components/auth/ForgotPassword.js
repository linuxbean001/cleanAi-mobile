import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, gql } from '@apollo/client';
import Toast from 'react-native-toast-message';
import Footer from '../Footer';
import Header from '../Header';
import config from './../../config/config';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [userList, setUserList] = useState([]);
  const [errors, setErrors] = useState({
    email: ''
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
  const FORGET_CUSTOMER = gql`
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  useEffect(() => {
    const endpoint = `/admin/api/${config.apiVersion}/customers.json`;
    axios
      .get(`${config.shopifyStoreUrl}${endpoint}`, {
        headers: {
          'X-Shopify-Access-Token': config.shopifyApiKey,
        },
      })
      .then(async (response) => {
        if (response.data.customers) {
          const customers = response.data.customers;
          setUserList(customers);
        }
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);
  const handleShopifyForget = () => {
    setErrors({
      email: ''
    });
    let isValid = true;
    if (!email || !/^\S+@\S+\.\S+/.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email address',
      }));
      isValid = false;
    }
    if (isValid) {
      const customerWithEmail = userList.find(customer => customer.email === email);
      if (customerWithEmail) {
        client.mutate({
          mutation: FORGET_CUSTOMER,
          variables: {
            email: email
          },
        }).then(response => {
          if (response) {
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Password Recovery',
              text2: 'Email sent successfully!',
            });
            navigation.navigate('login');
          } else {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Failed',
              text2: 'Failed to send recovery email.',
            });
          }
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Failed',
          text2: 'Email does not exists',
        });
      }
    }
  };
  return (
    <ScrollView>
      <Header />
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Reset your password</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.paragraphText}>
            We will send you an email to reset your password
          </Text>
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
        </View>
        <TouchableOpacity
          onPress={handleShopifyForget}
          style={styles.submit}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>navigation.navigate('login')}
        style={styles.cancel}>
       <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    height: 380,
    backgroundColor: '#F6F6F6',
  },
  backIcon: {
    width: 40,
    height: 40,
    top: 20,
    left: 16,
  },
  heading: {
    top: 20,
    marginLeft: 45,
    marginRight: 45,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headingText: {
    fontWeight: '400',
    fontSize: 30,
    textAlign: 'center',
    color: '#121212',
  },
  paragraph: {
    marginLeft: 45,
    marginRight: 45,
    top: 45,
    marginBottom: -20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paragraphText: {
    fontFamily: 'NunitoSans_7pt-Regular',
    fontWeight: '100',
    fontSize: 14,
    textAlign: 'center',
    color: '#222222',
  },
  form: {
    height: 100,
    top: 95,
    flexDirection: 'row',
    justifyContent: 'center'
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
  submit: {
    marginLeft: 120,
    marginRight: 120,
    height: 45,
    top:60,
    backgroundColor: '#121212',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    top: 12,
    color: '#F6F6F6',
  },
  cancel: {
    height: 64,
    top: 60,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelText: {
    height: 32,
    alignSelf: 'center',
    textDecorationLine:'underline',
    color:'#121212'
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    position: 'absolute',
    top: 40
  }
});
