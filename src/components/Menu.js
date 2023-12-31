import {
  StyleSheet,
  Text,
  Modal,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';

import Threads from '../assets/images/threads.png';
import Layer from '../assets/images/Layer.png';
import DreamSpace from '../assets/images/dream.png';
import Vector from '../assets/images/Vector.png';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MatrrialIcons from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Menu = ({menuVisible, setMenuVisible}) => {
  const navigation = useNavigation();
  return (
    <View>
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="slide"
        onBackdropPress={() => setMenuVisible(false)}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => setMenuVisible(false)}
            style={styles.ModalClose}>
            <AntDesignIcon name="close" size={24} color="#222222" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerDrawer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.facetsSummaryText}>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerDrawer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.facetsSummaryText}>Dreamscapes</Text>
              <AntDesignIcon name="arrowright" style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerDrawer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.facetsSummaryText}>
                Meet the Nerdle and team
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerDrawer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.facetsSummaryText}>Resources</Text>
              <AntDesignIcon name="arrowright" style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerDrawer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.facetsSummaryText}>Industires</Text>
              <AntDesignIcon name="arrowright" style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerDrawer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.facetsSummaryText}>Songs</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.utilityLinks}>
            <TouchableOpacity
            onPress={()=>navigation.navigate('login')}
            style={styles.account}>
              <MatrrialIcons name="person-outline" style={styles.accountIcon} />
              <Text style={styles.login}>Log in</Text>
            </TouchableOpacity>

            <View style={styles.socialIconsContainer}>
          <TouchableOpacity>
            <IoniconsIcon name="logo-facebook" style={styles.socialIcons} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IoniconsIcon name="logo-instagram" style={styles.socialIcons} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IoniconsIcon name="logo-youtube" style={styles.socialIcons} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IoniconsIcon name="logo-tiktok" style={styles.socialIcons} />
          </TouchableOpacity>
        </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  modalView: {
    width: '85%',
    height: '100%',
    top: 75,
    borderTopColor: '#FFFFFF',
    borderWidth: 0.2,
    // backgroundColor: '#191919',
    backgroundColor: '#000000',
  },
  headerDrawer: {
    width: 330,
    height: 50,
    gap: 4,
  },
  facetsSummaryText: {
    fontSize: 15,
    fontWeight: '700',
    left: 20,
    height: 26,
    color: '#FFFFFF',
  },
  arrowIcon: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  ModalClose: {
    top: 5,
    left: 360,
  },
  utilityLinks: {
    height: 100,
    backgroundColor: '#121212',
    top:160
  },
  account:{
    flexDirection:'row',
    top:20,
    left:20
  },
  accountIcon: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  login:{
    color:'#FFFFFF',
    left:10,
    top:2,
  },
  socialIconsContainer: {
    top: 40,
    left:24,
    flexDirection: 'row',
    gap: 24,
  },
  socialIcons: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});
