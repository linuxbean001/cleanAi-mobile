import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Logo from '../assets/images/logo.png';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('songs');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  image: {
    resizeMode: 'cover',
    width: 170,
    height: 50
  },
});

export default SplashScreen;
