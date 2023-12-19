import React, { useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../assets/images/PNG/H_Sound_Trans_Gold_Logo.png';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Menu from './Menu';
import Balance from './Balance';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './../config/config';
import axios from 'axios';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);
  const [balance, setBalance] = useState(0);
  const [activityData, setActivityData] = useState(null);
  const [error, setError] = useState(null);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userDetails || balance === 0) {
      loadUserData();
      // fetchData();
    }
  }, [userDetails, balance]);

  const loadUserData = async () => {
    try {
      const userDetail = await AsyncStorage.getItem('userDetail');
      if (userDetail) {
        const parsedUser = userDetail ? JSON.parse(userDetail) : {};
        setUserDetails(parsedUser);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // const fetchData = async () => {
  //   const email = (userDetails) ? userDetails.email : '';
  //   const apiUrl = `https://app.shopwaive.com/api/customer/${encodeURIComponent(email)}`;
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(apiUrl, {
  //       headers: {
  //         'X-Shopwaive-Access-Token': config.shopwaiveAccessToken,
  //         'X-Shopwaive-Platform': config.shopwaivePlatform,
  //         'Content-Type': 'application/json'
  //       },
  //     });
  //     const fetchedBalance = response.data;
  //     if (fetchedBalance.status !== 'Customer not found') {
  //       setActivityData(fetchedBalance.activity);
  //       setBalance(fetchedBalance.balance);
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Menu menuVisible={menuVisible} setMenuVisible={setMenuVisible} userDetails={userDetails} />
      <Balance balanceVisible={balanceVisible} setBalanceVisible={setBalanceVisible} balance={balance} activityData={activityData} userDetails={userDetails} />
      <View style={styles.inlineFlexContainer}>
        <View style={styles.item}>
          <TouchableOpacity style={styles.sidebarIcon} onPress={() => setMenuVisible(true)}>
            <FeatherIcon name="menu" size={20} color={'#FFFFFF'} />
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <View style={styles.item}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
            {balance > 0 && userDetails ? (<><TouchableOpacity onPress={() => setBalanceVisible(true)}>
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>Credits: {balance}</Text>
              </View>
            </TouchableOpacity></>):
            (<><View style={styles.balanceContainer}>
              <Text style={styles.balanceText}>Credits: {balance}</Text>
            </View></>)}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    width: '100%',
    backgroundColor: '#121212',
  },
  inlineFlexContainer: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarIcon: {
    width: 40,
    height: 40,
    top: 10,
    right: 20
  },
  logo: {
    width: 130,
    height: 50,
    right: 10
  },
  balanceContainer: {
    left: 15,
  },
  balanceText: {
    color: '#FFFFFF',
  },
});

export default Header;
