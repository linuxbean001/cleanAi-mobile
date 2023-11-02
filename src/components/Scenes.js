import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {Overlay} from 'react-native-elements';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import BellIcon from 'react-native-vector-icons/Feather';
import ImageIcon from 'react-native-vector-icons/Feather';
import PasswordIcon from 'react-native-vector-icons/Feather';

import Dream from '../assets/images/Frame.png';
import Threads from '../assets/images/threads.png';
import Layer from '../assets/images/Layer.png';
import DreamSpace from '../assets/images/dream.png';
import Star from '../assets/images/star.png';
import Vector from '../assets/images/Vector.png';
import Group from '../assets/images/Group.png';
import {useNavigation} from '@react-navigation/native';
import Menu from './Menu';

const Scenes = () => {
  const [visible, setVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Menu menuVisible={menuVisible} setMenuVisible={setMenuVisible}/>

        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.sidebarIcon}
            onPress={() => setMenuVisible(true)}>
            <FontAwesomeIcon name="bars" size={24} color={'#222222'} />
          </TouchableOpacity>
          <Image style={styles.dreamSpace} source={Dream} />
          <View style={styles.bellIcon}>
            <BellIcon name="bell" size={24} color={'#222222'} />
          </View>
        </View>
        <View style={styles.field}>
          <Image source={Star} />
          <TextInput placeholder="Where are you going?" />
        </View>
        <View style={styles.uplodImageFrame}>
          <View style={styles.textContainer}>
            <Text style={styles.uploadText}>Upload an image or 3D </Text>
            <Text style={styles.uploadText}>spatial video for inspiration</Text>
          </View>
          <View style={styles.comfortContainer}>
            <Text style={styles.comfortText}>
              Comfort of your own living room.
            </Text>
          </View>
          <TouchableOpacity style={styles.imageButton} onPress={toggleOverlay}>
            <Text style={styles.imageButtonText}>Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.spatialButton}
            onPress={toggleOverlay}>
            <Text style={styles.spatialButtonText}>3D Spatial</Text>
          </TouchableOpacity>

          <Overlay isVisible={visible} overlayStyle={styles.overlayContainer}>
            <View style={styles.galleryButton}>
              <Text style={styles.overlayText}>Photo Gallery</Text>
            </View>
            <View style={styles.cameraButton}>
              <Text style={styles.overlayText}>Camera</Text>
            </View>
            <TouchableOpacity
              onPress={toggleOverlay}
              style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </Overlay>
        </View>
        <View style={styles.vectorImage}>
          <Image source={Vector} />
        </View>
        <View style={styles.pickContainer}>
          <Text style={styles.pickHeading}>PICK YOUR SCENE</Text>
          <Text style={styles.pickText}>
            Pick a pre-made or randomize scene.
          </Text>
        </View>
        <View style={styles.randomizeButton}>
          <Text style={styles.randomizeText}>randomize scene</Text>
        </View>
        <View style={styles.ImageGroup}>
          <Image source={Group} />
        </View>

        <View style={styles.imagesContainer}>
          <View>
            <Text style={styles.headings}>Rest & Relaxation</Text>

            <View style={styles.smallImageContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('scene')}
                style={styles.smallImage}>
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </TouchableOpacity>
              <View style={styles.smallImage}>
                <PasswordIcon
                  style={styles.passwordIcon}
                  name="lock"
                  size={14}
                />
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </View>
              <View style={styles.smallImage}>
                <PasswordIcon
                  style={styles.passwordIcon}
                  name="lock"
                  size={14}
                />
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </View>
            </View>
          </View>

          <View style={{top: 60}}>
            <Text style={styles.headings}>Focus Time</Text>
            <View style={styles.smallImageContainer}>
              <View style={styles.smallImageshort}>
                <PasswordIcon
                  style={styles.passwordIcon}
                  name="lock"
                  size={14}
                />
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </View>
              <View style={styles.smallImageshort}>
                <PasswordIcon
                  style={styles.passwordIcon}
                  name="lock"
                  size={14}
                />
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </View>
              <View style={styles.smallImageshort}>
                <PasswordIcon
                  style={styles.passwordIcon}
                  name="lock"
                  size={14}
                />
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </View>
              <View style={styles.smallImageshort}>
                <PasswordIcon
                  style={styles.passwordIcon}
                  name="lock"
                  size={14}
                />
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </View>
            </View>
          </View>

          <View style={{top: 120}}>
            <Text style={styles.headings}>Musical Genre</Text>
            <View style={styles.smallImageContainer}>
              <View style={styles.smallImage}>
                <PasswordIcon
                  style={styles.passwordIcon}
                  name="lock"
                  size={14}
                />
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </View>
              <View style={styles.smallImage}>
                <PasswordIcon
                  style={styles.passwordIcon}
                  name="lock"
                  size={14}
                />
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </View>
              <View style={styles.smallImage}>
                <PasswordIcon
                  style={styles.passwordIcon}
                  name="lock"
                  size={14}
                />
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </View>
            </View>
          </View>

          <View style={{top: 180}}>
            <Text style={styles.headings}>Sleep Sounds</Text>
            <View style={styles.smallImageContainer}>
              <View style={styles.smallImageshort}>
                <PasswordIcon
                  style={styles.passwordIcon}
                  name="lock"
                  size={14}
                />
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </View>
              <View style={styles.smallImageshort}>
                <PasswordIcon
                  style={styles.passwordIcon}
                  name="lock"
                  size={14}
                />
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </View>
              <View style={styles.smallImageshort}>
                <PasswordIcon
                  style={styles.passwordIcon}
                  name="lock"
                  size={14}
                />
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </View>
              <View style={styles.smallImageshort}>
                <PasswordIcon
                  style={styles.passwordIcon}
                  name="lock"
                  size={14}
                />
                <ImageIcon style={styles.imageIcon} name="image" size={32} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Scenes;

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 1956,
    backgroundColor: '#F6F6F6',
  },
  sidebarIcon: {
    width: 40,
    height: 40,
    top: 29,
    left: 16,
    color: '#222222',
  },
  bellIcon: {
    width: 40,
    height: 40,
    top: 35,
    left: 170,
    color: '#222222',
  },
  dreamSpace: {
    width: 121,
    height: 38,
    top: 25,
    left: 80,
  },
  field: {
    height: 48,
    width: 327,
    top: 50,
    left: 24,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#5D5D5D',
    gap: 16,
  },
  uplodImageFrame: {
    width: 327,
    height: 223,
    top: 65,
    left: 24,
    backgroundColor: '#E7E7E7',
  },
  textContainer: {
    width: 295,
    height: 52,
    top: 32,
    left: 16,
  },
  uploadText: {
    fontFamily: 'Marcellus-Regular',
    fontWeight: '400',
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#222222',
    letterSpacing: -1,
    lineHeight: 26,
  },
  comfortContainer: {
    width: 295,
    height: 19,
    top: 40,
    left: 16,
  },
  comfortText: {
    fontFamily: 'NunitoSans_7pt',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    textAlign: 'center',
    color: '#222222',
  },
  imageButton: {
    width: 103,
    height: 48,
    top: 70,
    left: 42,
    borderRadius: 44,
    borderWidth: 1,
    gap: 8,
    borderColor: '#222222',
  },
  imageButtonText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16.37,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#222222',
    top: 12,
  },
  spatialButton: {
    width: 103,
    height: 48,
    top: 22,
    left: 160,
    borderRadius: 44,
    borderWidth: 1,
    gap: 8,
    backgroundColor: '#222222',
  },
  spatialButtonText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16.37,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#F6F6F6',
    top: 12,
  },
  vectorImage: {
    width: 32,
    height: 11,
    left: 190,
    top: 110,
  },
  pickContainer: {
    width: 327,
    height: 53,
    top: 170,
    left: 24,
    gap: 8,
  },
  pickHeading: {
    fontFamily: 'Marcellus_Regular',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -1,
    textAlign: 'center',
    color: '#222222',
  },
  pickText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    color: '#222222',
  },
  randomizeButton: {
    width: 180,
    height: 48,
    top: 200,
    left: 97,
    borderRadius: 44,
    gap: 8,
    backgroundColor: '#222222',
  },
  randomizeText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    color: '#F6F6F6',
    textTransform: 'uppercase',
    top: 15,
  },
  ImageGroup: {
    width: 327,
    height: 354,
    top: 250,
    left: 24,
  },
  imagesContainer: {
    width: 455,
    height: 791,
    top: 300,
    left: 24,
  },
  headings: {
    fontFamily: 'Marcellus-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: '#222222',
    textTransform: 'uppercase',
  },
  smallImageContainer: {
    width: 455,
    height: 135,
    top: 20,
    gap: 12,
    display: 'flex',
    flexDirection: 'row',
  },
  smallImage: {
    width: 143,
    height: 135,
    backgroundColor: '#E7E7E7',
  },
  smallImageshort: {
    width: 91,
    height: 135,
    backgroundColor: '#E7E7E7',
  },
  imageIcon: {
    top: 45,
    alignSelf: 'center',
    color: '#D1D1D1',
  },
  passwordIcon: {
    left: '75%',
    top: 10,
    color: '#222222',
    position: 'absolute',
  },
  galleryButton: {
    width: 355,
    height: 61,
    top: 500.5,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  overlayContainer: {
    width: 400,
    height: 812,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  overlayText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    top: 15,
    color: '#222222',
  },
  cancelText: {
    fontFamily: 'NunitoSans_7pt',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    top: 18,
    color: '#222222',
  },
  cameraButton: {
    width: 355,
    height: 61,
    top: 501,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  cancelButton: {
    width: 355,
    height: 61,
    top: 510,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  
});
