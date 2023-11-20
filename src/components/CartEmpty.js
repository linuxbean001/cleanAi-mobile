import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';

const CartEmpty = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.cardEmptyTop}>
        <Text style={styles.yourCartText}>Your cart is empty</Text>
      </View>
      <View style={styles.cardEmptyBtn}>
        <TouchableOpacity
          onPress={()=>navigation.navigate('songs')}
          style={styles.shoppingBtn}>
          <Text style={styles.shoppingText}>Continue shopping</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardBottomText}>
        <Text style={styles.accountText}>Have an account?</Text>
      </View>
      <View style={styles.cardBottomText1}>
        <TouchableOpacity onPress={()=>navigation.navigate('login')}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.bottomText1}>to check out faster.</Text>
      </View>
    </> 
  );
};
const styles = StyleSheet.create({
  cardEmptyTop: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cardEmptyBtn: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  yourCartText: {
    fontSize: 35,
    color: '#000'
  },
  cardBottomText: {
    marginTop: 50,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  accountText: {
    fontSize: 20,
    color: '#000'
  },
  cardBottomText1: {
    marginTop: -10,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomText1: {
    fontSize: 15,
    color: '#000',
    marginLeft: 5
  },
  loginText: {
    textDecorationLine: 'underline'
  },
  shoppingBtn: {
    width: 250,
    padding: 15,
    backgroundColor: '#121212',
    alignSelf: 'center'
  },
  shoppingText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  }
});

export default CartEmpty;
