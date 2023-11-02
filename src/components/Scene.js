import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Line from '../assets/images/Line.png';
import Video from '../assets/images/video.png';
import bgImage from '../assets/images/background.png';

import VolumeIcon from 'react-native-vector-icons/Feather';
import SlidersIcon from 'react-native-vector-icons/Feather';
import CopyRightIcon from 'react-native-vector-icons/AntDesign';

const Scene = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.Innercontainer}>
        <View style={styles.blackRow}></View>
        <Image source={Video} style={styles.videoImage} />

        <ImageBackground source={bgImage} style={styles.backgroungImage}>
          <Image style={styles.line} source={Line} />
          <VolumeIcon style={styles.volumeIcon} name="volume-x" size={24} />
          <View style={{backgroundColor: '#F6F6F6', top: 150, height:200}}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>scene title</Text>
              <Text style={styles.discription}>
                Ipsum mauris habitant fames eu blandit sed. Cursus dui sit
                porttitor imperdiet risus.
              </Text>
            </View>
            <View style={styles.options}>
              <Text style={styles.optionText}>Focus Time</Text>
              <Text style={styles.optionText}>|</Text>
              <Text style={styles.optionText}>Sleep Sounds</Text>
              <Text style={styles.optionText}>|</Text>
              <Text style={styles.optionText}>Musical Genre</Text>
            </View>

             <TouchableOpacity
            style={styles.playButton}
            onPress={() => navigation.navigate('scenePlayOnPhone')}>
            <Text style={styles.butttonText}>play scene </Text>
            <Text style={styles.butttonText}>|</Text> 
            <Text style={styles.butttonText}>40</Text>
            <CopyRightIcon name='copyright' style={styles.butttonText}/>
          </TouchableOpacity> 
        
          <TouchableOpacity onPress={()=>navigation.navigate('sceneSettings')}>
          <SlidersIcon name='sliders' size={24}  style={styles.sliders}/>
          </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Scene;

const styles = StyleSheet.create({
  container: {
    height: 812,
    width: '100%',
    backgroundColor: '#222222',
  },
  Innercontainer: {
    width: '100%',
    height: 753,
    top: 59,
    borderRadius: 24,
    backgroundColor: '#D1D1D1',
  },
  blackRow: {
    width: 101,
    height: 4,
    top: 23,
    left: 137,
    borderRadius: 16,
    backgroundColor: '#222222',
  },
  videoImage: {
    width: 32,
    height: 32,
    top: 110,
    left: 179,
  },
  backgroungImage: {
    width: '100%',
    height: 247,
    top: 180,
  },
  line: {
    width: 88,
    height: 16,
    top: 50,
    left: 144,
  },
  volumeIcon: {
    top: 30,
    left: 320,
  },
  titleContainer: {
    width: 311,
    height: 36,
    bottom: 60,
    left: 32,
  },
  titleText: {
    fontFamily: 'Marcellus-Regular',
    fontWeight: '400',
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -1,
    textTransform: 'uppercase',
    color: '#222222',
  },
  discription: {
    width: 311,
    height: 42,
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
    top: 5,
    color: '#222222',
  },
  options:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:311,
    height:50,
    top:10,
    left:32,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#E7E7E7'
  },
  optionText:{
    fontFamily:'Marcellus_Regular',
    fontWeight:'400',
    fontSize:12,
    lineHeight:18,
    color:'#222222',
    textTransform:'uppercase',
    top:15
  },
  playButton: {
    display:'flex',
    flexDirection:'row',
    width: 231,
    height: 64,
    top: 30,
    left: 32,
    borderRadius: 44,
    gap: 8,
    backgroundColor: '#222222',
  },
  butttonText: {
    fontFamily:'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    left:40,
    top: 20,
    color: '#F6F6F6',
    lineHeight:19,
    textTransform:'uppercase'
  },
  sliders:{
    left:303,
   bottom:15,
   color:"#222222"
  }
});
