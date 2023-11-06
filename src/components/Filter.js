import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';

import Threads from '../assets/images/threads.png';
import Layer from '../assets/images/Layer.png';
import DreamSpace from '../assets/images/dream.png';
import Vector from '../assets/images/Vector.png';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Filter = ({filterVisible, setFilterVisible}) => {
  return (
    <View>
      <Modal transparent={true} animationType="slide" visible={filterVisible}>
        <View style={styles.modalView}>
          <View style={styles.facetsHeader}>
            <Text style={styles.facetsHeading}>Filter</Text>
            <Text style={styles.facetsCount}>11 products</Text>
            <TouchableOpacity
              onPress={() => setFilterVisible(false)}
              style={styles.ModalClose}>
              <AntDesignIcon name="close" size={24} color="#121212BF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.facetsSummary}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.facetsSummaryText}>Categories</Text>
              <AntDesignIcon name="arrowright" style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.facetsSummary}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.facetsSummaryText}>Music genres</Text>
              <AntDesignIcon name="arrowright" style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
          <View style={styles.facetsFooter}>
            <TouchableOpacity style={styles.clearWrapper}>
            <Text style={styles.clearText}>Remove all</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.applyContainer}>
            <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  modalView: {
    width: '85%',
    height: '100%',
    borderWidth: 0.2,
    backgroundColor: '#FFFFFF',
    left: 62,
  },
  facetsHeader: {
    top: 10,
    width: 350,
    height: 55,
    borderBottomWidth: 0.2,
  },
  facetsHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#121212B3',
    textAlign: 'center',
  },
  facetsCount: {
    fontSize: 13,
    color: '#121212B3',
    textAlign: 'center',
    top: 5,
  },
  ModalClose: {
    bottom: 29,
    left: 305,
  },
  facetsSummary: {
    width: 330,
    height: 50,
    top: 60,
    gap: 4,
  },
  facetsSummaryText: {
    fontSize: 15,
    left: 20,
    height: 26,
    color: '#121212BF',
  },
  arrowIcon: {
    fontSize: 16,
    color: '#121212BF',
  },
  facetsFooter: {
    width: 348,
    height: 60,
    borderTopColor:'FFFFFF',
    borderTopWidth:0.2,
    top:440,
    flexDirection:'row',
    justifyContent:'center',
    gap:2
  },
  clearWrapper:{
    height:40,
    width:155,
    top:12,
  },
  clearText:{
    color: '#121212BF',
    textDecorationLine:'underline',
    textAlign:'center',
    top:10
  },
  applyContainer:{
    height:40,
    width:155,
    top:12,
    backgroundColor:'#000000'
  },
  applyText: {
    textAlign:'center',
    top:10,
    color:'#FFFFFF'
  },

  
});
