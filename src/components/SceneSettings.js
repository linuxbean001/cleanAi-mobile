import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

import BackIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Slider from '../assets/images/Slider.png';

import {useNavigation} from '@react-navigation/native';

const SceneSettings = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('scene')}>
        <BackIcon style={styles.backIcon} name="arrow-back" />
      </TouchableOpacity>
      <Text style={styles.connected}>Connected Device</Text>
      <View style={styles.someoneContainer}>
        <FeatherIcon name="monitor" style={styles.monitor} />
        <Text style={styles.someone}>Someone’s iMac</Text>
        <FeatherIcon name="edit-2" style={styles.edit} />
      </View>
      <View style={styles.line}></View>
      <Text style={styles.speaker}>speakers</Text>
      <Text style={styles.description}>
        Porttitor pharetra orci facilisis dui.
      </Text>
      <View style={styles.systemContainer}>
        <Text style={styles.system}>5.1 System</Text>
        <FeatherIcon name="chevron-down" style={styles.chevron} />
      </View>
      <View style={styles.line2}></View>

      <View style={{top: 70}}>
        <Text style={styles.speaker}>Resolution</Text>
        <Text style={styles.description}>
          Porttitor pharetra orci facilisis dui.
        </Text>
        <View style={styles.systemContainer}>
          <Text style={styles.system}>4K</Text>
          <FeatherIcon name="chevron-down" style={styles.chevron} />
        </View>
        <View style={styles.line2}></View>
      </View>
      <Text style={styles.volume}>volume</Text>
      <View style={styles.sliderContainer}>
        <FeatherIcon name="volume-1" style={styles.volumeIcon} />
        <Image source={Slider} style={styles.slider} />
      </View>
    </View>
  );
};

export default SceneSettings;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 812,
    backgroundColor: '#FFFFFF',
  },
  backIcon: {
    width: 40,
    height: 40,
    top: 29,
    left: 16,
    fontSize: 24,
    color: '#000000',
  },
  connected: {
    width: 327,
    height: 22,
    fontFamily: 'Marcellus-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: '#222222',
    left: 24,
    top: 50,
    textTransform: 'uppercase',
    color: '#222222',
  },
  someoneContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 327,
    height: 40,
    top: 80,
    left: 24,
    gap: 16,
  },
  monitor: {
    color: '#222222',
    fontSize: 24,
  },
  someone: {
    width: 259,
    height: 16,
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16,
    color: '#222222',
    top: 3,
  },
  edit: {
    top: 3,
    fontSize: 12,
    color: '#222222',
  },
  line: {
    width: 327,
    top: 95,
    left: 24,
    borderWidth: 1,
    borderColor: '#E7E7E7',
  },
  line2: {
    width: 327,
    top: 170,
    left: 24,
    borderWidth: 1,
    borderColor: '#E7E7E7',
  },
  speaker: {
    height: 22,
    left: 26,
    fontFamily: 'Marcellus-Regular',
    fontSize: 16,
    lineHeight: 22,
    color: '#222222',
    top: 130,
    textTransform: 'uppercase',
  },
  description: {
    height: 19,
    left: 26,
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
    color: '#222222',
    top: 135,
  },
  systemContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 325,
    height: 48,
    top: 150,
    left: 26,
    gap: 16,
    borderBottomWidth: 1,
    borderColor: '#5D5D5D',
  },
  system: {
    width: 277,
    height: 16,
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: '#5D5D5D',
    top: 15,
    left: 8,
  },
  chevron: {
    color: '#000000',
    fontSize: 16,
    top: 15,
  },
  volume: {
    width: 327,
    height: 22,
    top: 260,
    left: 24,
    gap: 16,
    fontFamily: 'Marcellus-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: '#222222',
    textTransform: 'uppercase',
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 327,
    height: 24,
    top: 260,
    left: 24,
    gap: 8,
  },
  volumeIcon: {
    fontSize: 24,
    color: '#222222',
    top:10
  },
  slider: {
    width: 295,
    height: 16,
    top: 14,
  },
});
