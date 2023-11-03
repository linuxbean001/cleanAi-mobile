import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

import Logo from '../assets/images/logo.png';

const Footer = () => {
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
        <Text style={styles.footerListText}> My Account</Text>
        <Text style={styles.footerListText}> Songs Library</Text>
        <Text style={styles.footerListText}> Buy Credits</Text>
        </View>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#000000',
    height: 600,
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
  footerListMenu:{
    top:160,
    gap:25
},
  footerListText:{
    color: '#ffffff',

  }
});
