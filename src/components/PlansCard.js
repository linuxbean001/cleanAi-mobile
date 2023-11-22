import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';

const PlansCard = ({ title, description, price }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>
        <FontAwesome6 name="check" size={20} color="#abaf51" /> {description}
      </Text>
      <View style={styles.priceText}>
         <Text style={styles.superStyle}>$</Text>
         <Text style={styles.price}>{price}</Text>
      </View>
      <View style={styles.cardBtn}>
        <TouchableOpacity
          onPress={()=>navigation.navigate('addtocart', { price: price, plan: title })}
          style={styles.selectBtn}>
          <Text style={styles.selectText}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const superFontSize = Math.floor(35 * 0.6)
const superlineHeight = superFontSize * 1.1
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
    margin: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  cardTop: {
    backgroundColor: '#abaf51',
    padding: 35,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center'
  },
  description: {
    marginTop: 30,
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
    color: '#000'
  },
  priceText: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
    textAlign: 'center',
    alignSelf: 'center'
  },
  superStyle: {
    textAlignVertical: 'top', 
    fontSize: superFontSize, 
    lineHeight: superlineHeight,
    fontWeight: 'bold',
    color: '#000'
  },
  price: {
    textAlignVertical: 'bottom', 
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000'
  },
  cardBtn: {
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 35
  },
  selectBtn: {
    width: 150,
    padding: 10,
    backgroundColor: '#abaf51',
    alignSelf: 'center',
    borderRadius: 5
  },
  selectText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  }
});

export default PlansCard;
