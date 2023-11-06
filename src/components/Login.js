import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import Footer from './Footer';
import Header from './Header';

const Login = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Header />
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Login</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.fields}>
            <TextInput style={styles.inputfiield} placeholder="Email" />
          </View>
          <View style={styles.fields}>
            <TextInput style={styles.inputfiield} placeholder="Password" />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('forgotPassword')}
          style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Forgot your password ?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('scenes')}
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
  },
  forgotPassword: {
    height: 20,
    top: 60,
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
});
