import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';

import BackIcon from 'react-native-vector-icons/Ionicons';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordIcon from 'react-native-vector-icons/Feather';
import AppleIcon from 'react-native-vector-icons/AntDesign';
import NameIcon from 'react-native-vector-icons/Octicons';
import PhoneIcon from 'react-native-vector-icons/Octicons';
import MessageIcon from 'react-native-vector-icons/Feather';
import BriefCaseIcon from 'react-native-vector-icons/Feather';

const Register = () => {
  const navigation = useNavigation();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [accounts, setAccounts] = useState('individual');

  return (
    <ScrollView>
      <View
        style={[
          accounts === 'organization' ? styles.sendContainer : styles.container,
        ]}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.navigate('login')}>
          <BackIcon name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <View style={styles.heading}>
          <Text style={styles.headingText}>REGISTER</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.paragraphText}>
            Donec arcu accumsan habitasse duis cons.
          </Text>
        </View>
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => setAccounts('individual')}
            style={[
              accounts === 'individual' ? styles.darkColor : styles.lightColor,
            ]}>
            <Text
              style={[
                accounts === 'individual'
                  ? styles.darkColorText
                  : styles.lightColorText,
              ]}>
              INDIVIDUAL
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setAccounts('organization')}
            style={[
              accounts === 'organization'
                ? styles.darkColor
                : styles.lightColor,
            ]}>
            <Text
              style={[
                accounts === 'organization'
                  ? styles.darkColorText
                  : styles.lightColorText,
              ]}>
              ORGANIZATION
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <View style={styles.fields}>
            <NameIcon name="person" size={16} color={'#222222'} />
            <TextInput style={styles.inputfiield} placeholder="Full name" />
          </View>
          <View style={[styles.fields, styles.fieldsMargin]}>
            <PhoneIcon name="device-mobile" size={16} color={'#222222'} />
            <TextInput style={styles.inputfiield} placeholder="Phone number" />
          </View>
          <View style={[styles.fields, styles.fieldsMargin]}>
            <EmailIcon name="email-outline" size={16} color={'#222222'} />
            <TextInput style={styles.inputfiield} placeholder="Email address" />
          </View>
          {accounts === 'organization' ? null : (
            <View style={[styles.fields, styles.fieldsMargin]}>
              <PasswordIcon name="lock" size={16} color={'#222222'} />
              <TextInput style={styles.inputfiield} placeholder="Password" />
            </View>
          )}
          {accounts === 'organization' ? (
            <View style={[styles.fields, styles.fieldsMargin]}>
              <BriefCaseIcon name="briefcase" size={16} color={'#222222'} />
              <TextInput
                style={styles.inputfiield}
                placeholder="Organization"
              />
            </View>
          ) : null}

          {accounts === 'organization' ? (
            <View style={[styles.fields, styles.fieldsMargin]}>
              <MessageIcon name="message-circle" size={16} color={'#222222'} />
              <TextInput style={styles.inputfiield} placeholder="Message" />
            </View>
          ) : null}

          {accounts === 'organization' ? null : (
            <View style={styles.checkboxContainer}>
              <View style={styles.checkbox}>
                <CheckBox
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
              </View>
              <Text style={styles.checkboxMessage}>
                I would like to receive news and updates
              </Text>
            </View>
          )}
        </View>
        {accounts === 'organization' ? null : (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>By signing up you agree on our</Text>
            <Text style={{textAlign: 'center', color: '#222222'}}>
              <Text style={styles.conditions}>Terms & Conditions</Text> and{' '}
              <Text style={styles.conditions}>Privacy Policy</Text>
            </Text>
          </View>
        )}

        {accounts === 'individual' ? (
          <View>
            <TouchableOpacity
            onPress={()=>navigation.navigate('verification')}
            style={styles.registerButton}>
              <Text style={styles.registerText}>REGISTER</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.registerWith}>Or register with</Text>
            </View>
            <TouchableOpacity style={styles.AppleButton}>
              <View style={styles.AppleContainer}>
                <AppleIcon name="apple1" size={24} color="#222222" />
                <Text style={styles.AppleText}>APPLE ID</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.registerText}>SEND</Text>
          </TouchableOpacity>
        )}
        <View
          style={[
            accounts === 'organization'
              ? styles.sendLayout
              : styles.registerLayout,
          ]}>
          <Text style={styles.textAccount}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    width: 410,
    height: 910,
    backgroundColor: '#F6F6F6',
  },
  sendContainer: {
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
  options: {
    width: 375,
    height: 48,
    top: 30,
    padding: (0, 32, 0, 32),
    display: 'flex',
    flexDirection: 'row',
  },
  darkColor: {
    width: 155.5,
    height: 48,
    padding: (16, 0, 16, 0),
    gap: 8,
    borderBottomWidth: 2,
  },
  darkColorText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    top: 20,
    color: '#222222',
  },
  lightColor: {
    width: 155.5,
    height: 48,
    padding: (16, 0, 16, 0),
    gap: 8,
    borderBottomWidth: 1,
    borderColor: '#D1D1D1',
  },
  lightColorText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    top: 20,
    color: '#5D5D5D',
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
  fieldsMargin: {
    marginTop: 10,
  },
  checkboxContainer: {
    width: 311,
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    width: 311,
    top: 25,
  },

  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#E7E7E7',
  },
  checkboxMessage: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    color: '#222222',
    left: 15,
  },
  messageContainer: {
    width: 311,
    height: 38,
    top: 80,
    left: 32,
  },
  message: {
    textAlign: 'center',
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 14,
    color: '#222222',
  },
  conditions: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    color: '#222222',
  },
  registerButton: {
    width: 311,
    height: 64,
    top: 120,
    left: 32,
    borderRadius: 44,
    backgroundColor: '#222222',
  },
  registerText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    top: 20,
    color: '#F6F6F6',
  },
  sendButton: {
    width: 311,
    height: 64,
    top: 80,
    left: 32,
    borderRadius: 44,
    backgroundColor: '#222222',
  },
  registerWith: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 14,
    color: '#5D5D5D',
    textAlign: 'center',
    top: 150,
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
  registerLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: 239,
    height: 19,
    top: 210,
  },
  sendLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: 239,
    height: 19,
    top: 90,
  },
  textAccount: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 14,
    color: '#5D5D5D',
  },
  login: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    color: '#222222',
    left: 4,
  },
});
