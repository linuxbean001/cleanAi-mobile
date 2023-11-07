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
import Footer from './Footer';
import Header from './Header';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const shopifyApiKey = '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';
  const shopifyStoreUrl = 'https://clean-ai.myshopify.com';
  const apiVersion = '2023-07';
  const handleRegistration = async () => {
    try {
      const customerData = {
        customer: {
          first_name: fullName,
          last_name: lastName,
          email,
          password,
          password_confirmation: password
        },
      };
      const response = await axios.post(
        `${shopifyStoreUrl}/admin/api/${apiVersion}/customers.json`,
        customerData,
        {
          headers: {
            'X-Shopify-Access-Token': shopifyApiKey,
          }
        }
      );
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Registration Successful',
        text2: 'You have successfully registered!',
      });
      navigation.navigate('login');
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Registration Failed',
        text2: error,
      });
    }
  };
  return (
    <ScrollView>
      <Header />
      <View
        style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Create account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.fields}>
            <TextInput
              style={styles.inputfield}
              placeholder="Full name"
              value={fullName}
              onChangeText={(text) => setFullName(text)}
            />
          </View>
          <View style={styles.fields}>
            <TextInput
              style={styles.inputfield}
              placeholder="Last name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </View>
          <View style={styles.fields}>
            <TextInput
              style={styles.inputfield}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.fields}>
            <TextInput
              secureTextEntry={true}
              style={styles.inputfield}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={handleRegistration}
          style={styles.createButton}
        >
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    width: 410,
    height: 450,
    backgroundColor: '#F6F6F6',
  },
  heading: {
    width: 311,
    height: 36,
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
  inputfield: {
    left: 10,
  },
  createText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    top: 12,
    color: '#F6F6F6',
  },
  createButton: {
    width: 120,
    height: 45,
    top: 210,
    left: 140,
    backgroundColor: '#121212',
  },


});
