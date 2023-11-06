import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Footer from './Footer';
import Header from './Header';

const ForgotPassword = () => {
  const navigation = useNavigation();

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
            <TextInput style={styles.inputfiield} placeholder="Email" />
          </View>
        </View>
        <TouchableOpacity style={styles.submit}>
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
  paragraph: {
    width: 311,
    height: 40,
    top: 45,
    left: 32,
  },
  paragraphText: {
    fontFamily: 'NunitoSans_7pt-Regular',
    fontWeight: '100',
    fontSize: 14,
    textAlign: 'center',
    color: '#222222',
  },
  form: {
    width: 311,
    height: 100,
    left: 32,
    top: 95,
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
  submit: {
    width: 120,
    height: 45,
    top:70,
    left: 120,
    backgroundColor: '#121212',
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
    width: 64,
    height: 64,
    top: 90,
    left: 150,
  },
  cancelText: {
    height: 32,
    alignSelf: 'center',
    textDecorationLine:'underline',
    color:'#121212'
  },
});
