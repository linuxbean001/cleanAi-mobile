import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import Logo from '../assets/images/PNG/H_Sound_Trans_Gold_Logo.png';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Menu from './Menu';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    loadUserData();
  }, [userDetails]);
  const loadUserData = async () => {
    try {
      const userDetail = await AsyncStorage.getItem('userDetail');
      if (userDetail) {
        const parsedUser = userDetail ? JSON.parse(userDetail) : {};
        setUserDetails(parsedUser);
      }
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
  };
  return (
    <View style={styles.header}>
      <Menu menuVisible={menuVisible} setMenuVisible={setMenuVisible} userDetails={userDetails}/>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.sidebarIcon}
          onPress={()=>setMenuVisible(true)}>
          <FeatherIcon name="menu" size={20} color={'#FFFFFF'} />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 75,
    width: '100%',
    backgroundColor: '#121212',
  },
  sidebarIcon: {
    width: 40,
    height: 40,
    top: 29,
    left: 25,
  },
  logo: {
    width: 130,
    height: 50,
    top: 10,
    left: 90,
  }
});
