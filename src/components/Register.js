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

import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();

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
            <TextInput style={styles.inputfield} placeholder="Full name" />
          </View>
          <View style={styles.fields}>
            <TextInput style={styles.inputfield} placeholder="Last name" />
          </View>
          <View style={styles.fields}>
            <TextInput style={styles.inputfield} placeholder="Email" />
          </View>

          <View style={styles.fields}>
            <TextInput style={styles.inputfield} placeholder="Password" />
          </View>
        </View>

        <TouchableOpacity style={styles.createButton}>
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
