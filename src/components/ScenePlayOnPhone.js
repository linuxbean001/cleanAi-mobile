import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import BackIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';


import Video from '../assets/images/video.png';
import Slider from '../assets/images/Slider.png';
import { useNavigation } from '@react-navigation/native';

const ScenePlayOnPhone = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <TouchableOpacity onPress={()=>navigation.navigate('scene')} style={styles.backIcon}>
          <BackIcon name="arrow-back" size={24} color="#222222" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('sceneSettings')} style={[styles.backIcon, styles.slidersIcon]}>
          <FeatherIcon name="sliders" size={24} color="#222222" />
        </TouchableOpacity>
      </View>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Seizure warning</Text>
      </View>
      <View style={styles.descriptionLayout}>
        <Text style={styles.description}>
          Diam tempor leo donec diam sem morbi nec morbi. Hendrerit blandit
          tempus mattis sodales sagittis mattis lectus nunc.
        </Text>
      </View>
      <Image source={Video} style={styles.videoImage} />
      <View>
        <Image source={Slider} style={styles.slider} />
        <View style={styles.timeLayout}>
          <Text style={styles.time}>10:23</Text>
          <Text style={styles.time}>45:00</Text>
        </View>
        <View style={styles.playerContainer}>
          <FeatherIcon name="skip-back"  style={styles.playerIcons}/>
          <FeatherIcon name="rewind"  style={styles.playerIcons} />
          <FeatherIcon name="pause-circle" style={styles.pauseIcon} />
          <FeatherIcon name="rewind"  style={[styles.playerIcons,styles.forward]} />
          <FeatherIcon name="skip-forward" style={styles.playerIcons} />
        </View>
      </View>
    </View>
  );
};

export default ScenePlayOnPhone;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 812,
    backgroundColor: '#D1D1D1',
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
  },
  backIcon: {
    width: 40,
    height: 40,
    top: 59,
    left: 16,
  },
  slidersIcon: {
    left: 319,
  },
  heading: {
    width: 295,
    height: 26,
    top: 123,
    left: 40,
  },
  headingText: {
    fontFamily: 'Marcellus-Regular',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -1,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#222222',
  },
  descriptionLayout: {
    width: 295,
    height: 57,
    top: 137,
    left: 40,
  },
  description: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    color: '#222222',
  },
  videoImage: {
    width: 32,
    height: 32,
    top: 186,
    left: 172,
  },
  slider: {
    width: 327,
    height: 16,
    top: 350,
    left: 24,
  },

  timeLayout: {
    width: 327,
    left: 24,
    justifyContent: 'space-between',
    top: 355,
    display: 'flex',
    flexDirection: 'row',
  },
  time: {
    width: 27,
    height: 14,
    fontFamily: 'NunitoSans_7pt',
    fontSize: 10,
    lineHeight: 14,
    color: '#222222',
  },
  playerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 320,
    height: 64,
    top: 370,
    left: 28,
    gap: 40,
  },
  playerIcons: {fontSize: 24, color: '#000000'},
  forward:{
    transform: [{rotateY: '180deg'}]
  },
  pauseIcon:{
    fontSize:54,
    color:'#000000',
    
  }
});
