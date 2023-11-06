import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';

import Logo from '../assets/images/logo.png';

import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Menu from './Menu';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
 
  return (
    <View style={styles.header}>
      <Menu menuVisible={menuVisible} setMenuVisible={setMenuVisible}/>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.sidebarIcon}
          onPress={()=>setMenuVisible(true)}>
          <FeatherIcon name="menu" size={20} color={'#FFFFFF'} />
        </TouchableOpacity>

        <Image source={Logo} style={styles.logo} />
        {/* <View style={styles.searchIcon}>
        <FeatherIcon name="search" size={20} color={'#FFFFFF'} />
      </View>
      <View style={styles.searchIcon}>
        <FeatherIcon name="shopping-bag" size={20} color={'#FFFFFF'} />
      </View> */}
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
    width: 170,
    height: 50,
    top: 10,
    left: 60,
  },
  // searchIcon: {
  //   width: 40,
  //   height: 40,
  //   top: 30,
  //   left: 100,
  // },
});
