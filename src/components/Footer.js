import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Logo from '../assets/images/logo.png';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <Image source={Logo} style={styles.logo} />
      <View style={{left: 40}}>
        <View style={styles.footerHeading}>
          <Text style={styles.footerHeadingText}>nerds unite</Text>
        </View>

        <View style={styles.detailsContent}>
          <Text style={styles.detailsContentText}>
            Welcome to CLEAN AI Technologies Inc., a hub for{' '}
          </Text>
          <Text style={styles.detailsContentText}>
            AI innovation and experiential design.
          </Text>
        </View>

        <View style={styles.quickContainer}>
          <Text style={styles.quickContainerText}>Quick links</Text>
        </View>
        <View style={styles.footerListMenu}>
          <TouchableOpacity onPress={()=>navigation.navigate('login')}>
            <Text style={styles.footerListText}> My Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('songs')}>
            <Text style={styles.footerListText}> Songs</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerListText}> Buy Credits</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialIconsContainer}>
          <TouchableOpacity>
            <IoniconsIcon name="logo-facebook" style={styles.socialIcons} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IoniconsIcon name="logo-instagram" style={styles.socialIcons} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IoniconsIcon name="logo-youtube" style={styles.socialIcons} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IoniconsIcon name="logo-tiktok" style={styles.socialIcons} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyright}>© 2023, </Text>
        <TouchableOpacity>
          <Text style={styles.copyright}>Clean AI </Text>
        </TouchableOpacity>
        <Text style={styles.copyright}>LLC</Text>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#000000',
    height: 580,
  },
  logo: {
    width: 170,
    height: 50,
    top: 20,
    left: 110,
  },
  footerHeading: {
    height: 20,
    width: 200,
    top: 60,
  },
  footerHeadingText: {
    color: '#ffffff',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 18,
  },
  detailsContent: {
    width: 350,
    height: 53,
    top: 80,
    gap: 5,
  },
  detailsContentText: {
    color: '#ffffff',
    fontSize: 15,
  },
  quickContainer: {
    height: 20,
    width: 200,
    top: 120,
  },
  quickContainerText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 18,
  },
  footerListMenu: {
    top: 160,
    gap: 25,
  },
  footerListText: {
    color: '#ffffff',
  },
  socialIconsContainer: {
    top: 220,
    flexDirection: 'row',
    gap: 24,
  },
  socialIcons: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  copyrightContainer: {
    top: 300,
    height: 20,
    width: '100%',
    borderTopColor: '#FFFFFF',
    borderWidth: 0.2,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  copyright: {
    color: '#FFFFFF',
    top: 12,
    fontSize: 13,
  },
});
