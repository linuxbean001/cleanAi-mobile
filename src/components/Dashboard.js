import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const navigation = useNavigation();
  const logoutAccount = async () => {
    await AsyncStorage.removeItem('userDetail');
    navigation.navigate('login')
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header />
        <View style={styles.accountSection}>
          <Text style={styles.customerTitle}>Account</Text>
          <TouchableOpacity
            onPress={()=>logoutAccount()}
            style={styles.logoutButton}>
            <IonIcon name="person-outline" style={styles.icon} />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
          <View>
          <Text style={styles.orderTitle}>Order history</Text>
            <Text style={styles.orderText}>You haven't placed any orders yet.</Text>
          </View>
          <View>
          <Text style={styles.Details}>Account details</Text>
          <TouchableOpacity>
            <Text style={styles.detailText}>View addresses (0)</Text>
          </TouchableOpacity>
          </View>
        </View>
        <Footer />
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F6F6F6',
  },
  accountSection: {
    height: 350,
    left: 20,
    flex: 1,
  },
  customerTitle: {
    top: 20,
    fontSize: 30,
    color: '#121212',
  },
  logoutButton: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    fontSize: 12,
    top: 30,
    color: '#121212D9',
  },
  logoutText: {
    top: 27,
    fontSize: 14,
    left: 5,
    textDecorationLine: 'underline',
    color: '#121212D9',
  },
  orderTitle:{
    top: 100,
    fontSize: 20,
    color: '#121212',
  },
  orderText:{
    top: 110,
    fontSize: 15,
    color: '#121212BF',
  },
  Details:{
    top: 150,
    fontSize: 20,
    color: '#121212',
  },
  detailText:{
    top: 160,
    fontSize: 15,
    textDecorationLine: 'underline',
    color: '#121212BF',
  }
});