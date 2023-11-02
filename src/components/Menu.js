import {StyleSheet, Text, Modal,View,Image,TouchableOpacity,ImageBackground} from 'react-native';
import React from 'react';

import Threads from '../assets/images/threads.png';
import Layer from '../assets/images/Layer.png';
import DreamSpace from '../assets/images/dream.png';
import Vector from '../assets/images/Vector.png';


import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


const Menu = ({menuVisible,setMenuVisible}) => {
  return (
    <View>
      <Modal transparent={true} visible={menuVisible}>
        <View style={styles.modalView}>
          <Image source={DreamSpace} style={styles.modalDreamImage} />
          <TouchableOpacity
            onPress={() => setMenuVisible(!menuVisible)}
            style={styles.ModalClose}>
            <AntDesignIcon name="close" size={24} color="#222222" />
          </TouchableOpacity>
          <Text style={styles.modalText}>Brooklyn Simmons</Text>
          <Text style={styles.modalEmail}>brooklyn.simmons@email.com</Text>
          <Text style={styles.modalRemaining}>Remaining credits:</Text>
          <TouchableOpacity style={styles.modalButton}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.number}>40</Text>
              <AntDesignIcon name="copyright" style={styles.modalCopyIcon} />
              <AntDesignIcon name="pluscircleo" style={styles.modalPlusIcon} />
            </View>
          </TouchableOpacity>
          <View style={styles.ModalVectorImage}>
            <Image source={Vector} />
          </View>
          <ImageBackground source={Layer} style={styles.modalBackgroundImage}>
            <View>
              <View style={styles.listContainer}>
                <Text style={styles.listText}>my scenes</Text>
                <Text style={styles.listText}>account</Text>
                <Text style={styles.listText}>Settings</Text>
                <Text style={styles.listText}>Contact</Text>
              </View>
              <View style={styles.logoutContainer}>
                <View style={styles.policyContainer}>
                  <Text style={styles.policyText}>terms & conditions</Text>
                  <Text style={styles.policyText}>privacy policy</Text>
                </View>
                <Text style={styles.logutText}>Log out</Text>
              </View>
              <View style={styles.iconsLayout}>
                <IonIcon name="logo-tiktok" style={styles.socialIcons} />
                <IonIcon name="logo-instagram" style={styles.socialIcons} />
                <FontAwesomeIcon name="facebook" style={styles.socialIcons} />
                <FontAwesomeIcon name="linkedin" style={styles.socialIcons} />
                <Image source={Threads} />
                <AntDesignIcon name="youtube" style={styles.socialIcons} />
              </View>
            </View>
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({

    modalView: {
        width: 303,
        height: 812,
        backgroundColor: '#191919',
      },
      modalDreamImage: {
        width: 97,
        height: 30,
        top: 50,
        left: 103,
      },
      modalText: {
        width: 255,
        height: 26,
        top: 80,
        left: 24,
        fontFamily: 'Marcellus-Regular',
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 26,
        textAlign: 'center',
        color: '#F6F6F6',
        textTransform: 'uppercase',
      },
      modalEmail: {
        width: 255,
        height: 19,
        top: 80,
        left: 24,
        fontFamily: 'NunitoSans_7pt',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
        color: '#F6F6F6',
      },
      modalRemaining: {
        width: 255,
        height: 19,
        top: 120,
        left: 24,
        fontFamily: 'Marcellus-Regular',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 19,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#F6F6F6',
      },
      modalButton: {
        width: 125,
        height: 48,
        top: 125,
        left: 89,
        borderRadius: 40,
        borderWidth: 1,
        gap: 4,
        borderColor: '#3D3D3D',
      },
      number: {
        width: 17,
        height: 16,
        fontFamily: 'NunitoSans_7pt',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16,
        textAlign: 'center',
        left: 12,
        top: 14,
        color: '#F6F6F6',
      },
      modalCopyIcon: {
        fontSize: 16,
        left: 16,
        top: 14,
        color: '#FFFFFF',
      },
      modalPlusIcon: {
        fontSize: 40,
        color: '#F6F6F6',
        left: 43,
        top: 2.5,
      },
      ModalVectorImage: {
        width: 32,
        height: 11,
        left: 140,
        top: 160,
      },
      listContainer: {
        bottom:20,
        left:24,
        width: 255,
        height: 128,
        gap: 10,
      },
      listText:{
        height:19,
        width:255,
        fontFamily:'NunitoSans',
        fontWeight:'700',
        fontSize:14,
        lineHeight:19,
        textAlign:'center',
        color:'#F6F6F6',
        textTransform:'uppercase',
        top:25
        },
      logoutContainer:{
        width:255,
        height:48,
        gap:16,
        bottom:220
      },
      policyContainer:{
        width:246,
        height:16,
        top:230,
        justifyContent:'space-between',
        flexDirection:'row'
      },
      policyText:{
        fontFamily:'NunitoSans_7pt',
        fontWeight:'700',
        fontSize:12,
        lineHeight:17,
        textAlign:'center',
        color:'#F6F6F6',
        textTransform:'uppercase',
        left:24
      },
      logutText:{
        fontFamily:'NunitoSans_7pt',
        fontWeight:'700',
        fontSize:12,
        lineHeight:17,
        textAlign:'center',
        color:'#F6F6F6',
        textTransform:'uppercase',
        left:30,
        top:230
      },
      iconsLayout:{
        width:216,
        height:24,
        gap:24,
        flexDirection:'row',
        left:50,
        top:45
      },
      socialIcons:{
        fontSize:16,
        color:"#D1D1D1",
        
      },
      modalBackgroundImage:{
        top:220,
        height:300
      },
      ModalClose:{
        top:29,
        left:309
      }
});
