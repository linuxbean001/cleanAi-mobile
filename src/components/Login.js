import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import BackIcon from 'react-native-vector-icons/Ionicons';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordIcon from 'react-native-vector-icons/Feather';
import AppleIcon from 'react-native-vector-icons/AntDesign';

const Login = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.navigate('Home')}>
        <BackIcon name="arrow-back" size={20} color="black" />
      </TouchableOpacity>
      <View style={styles.heading}>
        <Text style={styles.headingText}>LOGIN</Text>
      </View>
      <View style={styles.paragraph}>
        <Text style={styles.paragraphText}>
          Donec arcu accumsan habitasse duis cons.
        </Text>
      </View>
      <View style={styles.options}>
        <View style={styles.individual}>
          <Text style={styles.individualText}>INDIVIDUAL</Text>
        </View>
        <View style={styles.organization}>
          <Text style={styles.organizationText}>ORGANIZATION</Text>
        </View>
      </View>
     
      <View style={styles.form}>
          <View style={[styles.fields, styles.fieldsMargin]}>
            <EmailIcon name="email-outline" size={16} color={'#222222'} />
            <TextInput style={styles.inputfiield} placeholder="Email address" />
          </View>
          <View style={[styles.fields, styles.fieldsMargin]}>
            <PasswordIcon name="lock" size={16}  color={'#222222'} />
            <TextInput style={styles.inputfiield} placeholder="Password" />
          </View>
        </View>

      <TouchableOpacity 
      onPress={()=>navigation.navigate('forgotPassword')}
      style={styles.forgotPassword}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>navigation.navigate('scenes')}
      style={styles.LoginButton}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.loginWith}>Or login with</Text>
      </View>
      <TouchableOpacity style={styles.AppleButton}>
        <View style={styles.AppleContainer}>
          <AppleIcon name="apple1" size={24} color="#222222" />
          <Text style={styles.AppleText}>APPLE ID</Text>
        </View>
      </TouchableOpacity>
      <View
        style={styles.registerLayout}>
        <Text
          style={styles.textAccount}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('register')}>
          <Text
            style={styles.register}>
            Register now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: 410,
    height: 680,
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
  options: {
    width: 375,
    height: 48,
    top: 30,
    padding: (0, 32, 0, 32),
    display: 'flex',
    flexDirection: 'row',
  },
  individual: {
    width: 155.5,
    height: 48,
    padding: (16, 0, 16, 0),
    gap: 8,
    borderBottomWidth: 2,
  },
  individualText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    top: 20,
    color: '#222222',
  },
  organization: {
    width: 155.5,
    height: 48,
    padding: (16, 0, 16, 0),
    gap: 8,
    borderBottomWidth: 1,
  },
  organizationText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    top: 20,
    color: '#5D5D5D',
  },
  form: {
    width: 311,
    height: 100,
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
  fieldsMargin: {
    marginTop: 10,
  },
  
  forgotPassword: {
    width: 117,
    height: 19,
    top: 120,
    left: 129,
    textAlign: 'center',
  },
  forgotText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    color: '#222222',
  },
  LoginButton: {
    width: 311,
    height: 64,
    top: 150,
    left: 32,
    borderRadius: 44,
    backgroundColor: '#222222',
  },
  loginText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    top: 20,
    color: '#F6F6F6',
  },
  loginWith: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 14,
    color: '#5D5D5D',
    textAlign: 'center',
    top: 165,
  },
  AppleButton: {
    width: 311,
    height: 64,
    top: 180,
    left: 32,
    borderRadius: 44,
    borderWidth: 1,
  },
  AppleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  AppleText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    color: '#222222',
    left: 5,
  },
  registerLayout:{
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: 239,
    height: 19,
    top: 210,
  },
  textAccount:{
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 14,
    color: '#5D5D5D',
  },
  register:{
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    color: '#222222',
    left: 4,
  }
});
