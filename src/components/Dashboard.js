import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import config from './../config/config';

const Dashboard = () => {
  const navigation = useNavigation();
  const [orderData, setOrderData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const logoutAccount = async () => {
    await AsyncStorage.removeItem('userDetail');
    navigation.navigate('login');
  };

  useEffect(() => {
    loadUserData();
  }, []);
  const loadUserData = async () => {
    try {
      const userDetail = await AsyncStorage.getItem('userDetail');
      if (userDetail) {
        const parsedUser = JSON.parse(userDetail);
        setUserDetails(parsedUser);
        if (parsedUser && parsedUser.id) {
          const gid = parsedUser.id;
          const parts = gid.split('/');
          const id = parts[parts.length - 1];
          setUserId(id);
        }
      }
    } catch (error) {
      console.error('Error loading user details:', error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        if (userId) {
          const endpoint = `/admin/api/${config.apiVersion}/customers/${userId}/orders.json?status=any`;
          const response = await axios.get(`${config.shopifyStoreUrl}${endpoint}`, {
            headers: {
              'X-Shopify-Access-Token': config.shopifyApiKey,
            },
          });

          if (response.data.orders) {
            const orders = response.data.orders;
            setOrderData(orders);
          }
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAddresses = async () => {
      try {
        setLoading(true);
        if (userId) {
          const endpoint = `/admin/api/${config.apiVersion}/customers/${userId}/addresses.json`;
          const response = await axios.get(`${config.shopifyStoreUrl}${endpoint}`, {
            headers: {
              'X-Shopify-Access-Token': config.shopifyApiKey,
            },
          });

          if (response.data.addresses) {
            const addresses = response.data.addresses;
            setAddressData(addresses);
          }
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    fetchAddresses();
  }, [userId]);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.accountSection}>
        <Text style={styles.customerTitle}>Account</Text>
        <TouchableOpacity
          onPress={() => logoutAccount()}
          style={styles.logoutButton}>
          <IonIcon name="person-outline" style={styles.icon} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.orderTitle}>Order history</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
        <ScrollView style={styles.orderContainer}>
          {orderData.length > 0 ? (
            orderData.map((order) => (
              <View key={order.id} style={styles.row}>
                <View style={styles.column}>
                  <Text style={[styles.columnHead, styles.columnOrderHead]}>ORDER</Text>
                  <Text style={styles.columnHead}>DATE</Text>
                  <Text style={styles.columnHead}>PAYMENT STATUS</Text>
                  <Text style={styles.columnHead}>FULFILLMENT STATUS</Text>
                  <Text style={styles.columnHead}>TOTAL</Text>
                </View>
                <View style={styles.column}>
                  <Text style={[styles.columnName, styles.columnOrder]}>{order.name}</Text>
                  <Text style={styles.columnName}>{formatDate(order.created_at)}</Text>
                  <Text style={styles.columnName}>{order.financial_status}</Text>
                  <Text style={styles.columnName}>{order.fulfillment_status}</Text>
                  <Text style={styles.columnName}>{Number(order.current_total_price).toFixed(0)} credit</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>
              You haven't placed any orders yet.
            </Text>
          )}
        </ScrollView>
        )}
        <View>
          <Text style={styles.Details}>Account details</Text>
          {userDetails && (
            <View style={styles.userDetails}>
              <Text style={styles.userDetailText}>{userDetails.firstName} {userDetails.lastName}</Text>
              <Text style={styles.userDetailText}>{(userDetails && userDetails.defaultAddress && userDetails.defaultAddress.address1) ? userDetails.defaultAddress.address1 : ''}</Text>
              <Text style={styles.userDetailText}>{(userDetails && userDetails.defaultAddress && userDetails.defaultAddress.city) ? userDetails.defaultAddress.city : ''} {(userDetails && userDetails.defaultAddress && userDetails.defaultAddress.province) ? userDetails.defaultAddress.province : ''} {(userDetails && userDetails.defaultAddress && userDetails.defaultAddress.zip) ? userDetails.defaultAddress.zip : ''}</Text>
              <Text style={styles.userDetailText}>{(userDetails && userDetails.defaultAddress && userDetails.defaultAddress.country) ? userDetails.defaultAddress.country : ''}</Text>
            </View>
          )}
          <TouchableOpacity>
            <Text style={styles.detailText}>View addresses 
              {loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <> ({addressData.length})</>
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  accountSection: {
    padding: 20,
  },
  customerTitle: {
    fontSize: 30,
    color: '#121212',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 12,
    color: '#121212D9',
  },
  logoutText: {
    fontSize: 14,
    marginLeft: 5,
    textDecorationLine: 'underline',
    color: '#121212D9',
  },
  orderTitle: {
    fontSize: 20,
    color: '#121212',
    marginTop: 20,
  },
  orderContainer: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    marginTop: 20
  },
  column: {
    flex: 1
  },
  columnHead: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#616263'
  },
  columnName: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000'
  },
  columnOrderHead: {
    width: 80,
    paddingTop: 10,
    textAlign: 'left'
  },
  columnOrder: {
    borderWidth: 0.5,
    width: 80,
    padding: 5,
    textAlign: 'center'
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
  },
  Details: {
    fontSize: 20,
    color: '#121212',
    marginTop: 20,
  },
  detailText: {
    fontSize: 15,
    textDecorationLine: 'underline',
    color: '#121212BF',
    marginTop: 5,
  },
  userDetails: {
    marginTop: 10,
    marginBottom: 20
  },
  userDetailText: {
    fontSize: 15,
    color: '#121212'
  }
});
