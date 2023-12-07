import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import Threads from '../assets/images/threads.png';
import Layer from '../assets/images/Layer.png';
import DreamSpace from '../assets/images/dream.png';
import Vector from '../assets/images/Vector.png';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Filter = ({filterVisible, setFilterVisible, productTags, productTypes, applyFilter, filteredData}) => {
  const [checkedItems, setCheckedItems] = useState(Array(productTags.length).fill(false));
  const [checkedTypes, setCheckedTypes] = useState(Array(productTypes.length).fill(false));
  const [isCategoriesOpen, setCategoriesOpen] = useState(true);
  const [isMusicOpen, setMusicOpen] = useState(false);
  const handleCheckBoxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };
  const handleCheckBoxTypes = (index) => {
    const newCheckedItems = [...checkedTypes];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedTypes(newCheckedItems);
  };
  const toggleCategories = () => {
    setCategoriesOpen(!isCategoriesOpen);
  };
  const toggleMusic = () => {
    setMusicOpen(!isMusicOpen);
  };
  const handleRemoveAll = () => {
    setCheckedItems(Array(productTags.length).fill(false));
    setCheckedTypes(Array(productTypes.length).fill(false));
    applyFilter([], []);
    setFilterVisible(false);
  };
  const handleApply = () => {
    const selectedTags = productTags.filter((_, index) => checkedItems[index]);
    const selectedTypes = productTypes.filter((_, index) => checkedTypes[index]);
    applyFilter(selectedTags, selectedTypes);
    setFilterVisible(false);
  };
  return (
    <View>
      <Modal transparent={true} animationType="slide" visible={filterVisible}>
        <View style={styles.modalView}>
          <View style={styles.facetsHeader}>
            <Text style={styles.facetsHeading}>Filter</Text>
            <Text style={styles.facetsCount}>{filteredData} products</Text>
            <TouchableOpacity
              onPress={() => setFilterVisible(false)}
              style={styles.ModalClose}>
              <AntDesignIcon name="close" size={24} color="#121212BF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.facetsSummary} onPress={toggleCategories}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.facetsSummaryText}>Categories</Text>
              <AntDesignIcon name="arrowright" style={styles.arrowIcon} />
            </View>
            {isCategoriesOpen && (
              <View style={styles.checkContain}>
                {productTags.map((tag, index) => (
                  <CheckBox
                    key={index}
                    title={tag}
                    checked={checkedItems[index]}
                    onPress={() => handleCheckBoxChange(index)}
                  />
                ))}
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={isCategoriesOpen ? styles.facetsSummary1 : styles.facetsSummary}
            onPress={toggleMusic}
          >
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.facetsSummaryText}>Music genres</Text>
              <AntDesignIcon name="arrowright" style={styles.arrowIcon} />
            </View>
            {isMusicOpen && (
              <View style={styles.checkContain}>
                {productTypes.map((tag, index) => (
                  <CheckBox
                    key={index}
                    title={tag}
                    checked={checkedTypes[index]}
                    onPress={() => handleCheckBoxTypes(index)}
                  />
                ))}
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.facetsFooter}>
            <TouchableOpacity onPress={handleRemoveAll} style={styles.clearWrapper}>
            <Text style={styles.clearText}>Remove all</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleApply} style={styles.applyContainer}>
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
  facetsSummary1: {
    width: 330,
    height: 50,
    top: 220,
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
  checkContain: {
    position: 'absolute',
    top: 30,
    left: 10
  }  
});
