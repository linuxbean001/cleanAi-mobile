import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BackIcon from 'react-native-vector-icons/Ionicons';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPassword = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.navigate('login')}>
          <BackIcon name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <View style={styles.heading}>
          <Text style={styles.headingText}>FORGOT PASSWORD</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.paragraphText}>
            Donec arcu accumsan habitasse duis cons.
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.fields}>
            <EmailIcon name="email-outline" size={16} color={'#222222'} />
            <TextInput style={styles.inputfiield} placeholder="Email address" />
          </View>
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

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    width: 410,
    height: 710,
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

  form: {
    width: 311,
    height: 320,
    left: 32,
    top: 80,
  },

  fields: {
    height: 48,
    width: 311,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#5D5D5D',
  },
  inputfiield: {
    left: 10,
  },

  arrowRightContainer: {
    width: 64,
    height: 64,
    top: 120,
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
