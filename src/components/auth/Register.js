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
import Footer from '../Footer';
import Header from '../Header';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import config from './../../config/config';

const Register = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    fullName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const handleRegistration = async () => {
    setErrors({
      fullName: '',
      lastName: '',
      email: '',
      password: '',
    });
    let isValid = true;
    if (!fullName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullName: 'Full name is required',
      }));
      isValid = false;
    }
    if (!lastName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: 'Last name is required',
      }));
      isValid = false;
    }
    if (!email || !/^\S+@\S+\.\S+/.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email address',
      }));
      isValid = false;
    }
    if (!password || password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 6 characters',
      }));
      isValid = false;
    }
    if (isValid) {
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
          `${config.shopifyStoreUrl}/admin/api/${config.apiVersion}/customers.json`,
          customerData,
          {
            headers: {
              'X-Shopify-Access-Token': config.shopifyApiKey,
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
              placeholderTextColor="#000"
              value={fullName}
              onChangeText={(text) => setFullName(text)}
            />
            <Text style={styles.errorText}>{errors.fullName}</Text>
          </View>
          <View style={styles.fields}>
            <TextInput
              style={styles.inputfield}
              placeholder="Last name"
              placeholderTextColor="#000"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <Text style={styles.errorText}>{errors.lastName}</Text>
          </View>
          <View style={styles.fields}>
            <TextInput
              style={styles.inputfield}
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
              style={styles.inputfield}
              placeholder="Password"
              placeholderTextColor="#000"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Text style={styles.errorText}>{errors.password}</Text>
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
    color: '#000'
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
  errorText: {
    color: 'red',
    fontSize: 14,
    position: 'absolute',
    top: 40
  }
});
