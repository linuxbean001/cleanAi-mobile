import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BackIcon from 'react-native-vector-icons/Ionicons';
import ArrowIcon from 'react-native-vector-icons/AntDesign';

const Verification = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.navigate('register')}>
          <BackIcon name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <View style={styles.heading}>
          <Text style={styles.headingText}>VERIFICATION</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.paragraphText}>
            Donec arcu accumsan habitasse duis cons.
          </Text>
        </View>
        <View style={styles.boxLayout}>
          <View style={styles.box}></View>
          <View style={styles.box}></View>
          <View style={styles.box}></View>
          <View style={styles.box}></View>
        </View>

        <View style={{width: 311, height: 19, left: 32, top: 144}}>
          <Text
            style={{
              fontFamily: 'NunitoSans_7pt',
              fontWeight: '400',
              fontSize: 14,
              textAlign: 'center',
              color: '#222222',
            }}>
            Send again in 00:30
          </Text>
        </View>

        <TouchableOpacity style={styles.arrowRightContainer}>
          <ArrowIcon
            style={styles.arrowRight}
            name="arrowright"
            size={32}
            color="#F6F6F6"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    width: 410,
    height: 650,
    backgroundColor: '#F6F6F6',
  },
  backIcon: {
    width: 40,
    height: 40,
    top: 20,
    left: 16,
  },
  heading: {
    width: 311,
    height: 36,
    top: 20,
    left: 32,
  },
  headingText: {
    fontFamily: 'Marcellus-Regular',
    fontWeight: '400',
    fontSize: 30,
    textAlign: 'center',
    color: '#222222',
  },
  paragraph: {
    width: 311,
    height: 19,
    top: 30,
    left: 32,
  },
  paragraphText: {
    fontFamily: 'NunitoSans_7pt-Regular',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    color: '#222222',
  },
  boxLayout: {
    width: 311,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    left: 25,
  },
  box: {
    width: 56,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#E7E7E7',
    top: 100,
  },
  arrowRightContainer: {
    width: 64,
    height: 64,
    top: 380,
    left: 156,
    borderRadius: 44,
    backgroundColor: '#222222',
  },
  arrowRight: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    top: 12,
  },
});
