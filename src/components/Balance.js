import {
  StyleSheet,
  Text,
  Modal,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  FlatList
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

const Balance = ({balanceVisible, setBalanceVisible, balance, activityData, userDetails}) => {
  const navigation = useNavigation();
  const yourListData = [
    { id: 1, name: 'Item 1', recentColumn: 'Recent 1', availableColumn: 'Available 1' },
    { id: 2, name: 'Item 2', recentColumn: 'Recent 2', availableColumn: 'Available 2' },
    { id: 3, name: 'Item 2', recentColumn: 'Recent 2', availableColumn: 'Available 2' },
    { id: 4, name: 'Item 2', recentColumn: 'Recent 2', availableColumn: 'Available 2' },
    { id: 5, name: 'Item 2', recentColumn: 'Recent 2', availableColumn: 'Available 2' },
    { id: 6, name: 'Item 2', recentColumn: 'Recent 2', availableColumn: 'Available 2' },
  ];
  return (
    <View>
      <Modal
        transparent={true}
        visible={balanceVisible}
        animationType="slide"
        onBackdropPress={() => setBalanceVisible(false)}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => setBalanceVisible(false)}
            style={styles.ModalClose}>
            <AntDesignIcon name="minus" size={24} color="#000000" />
          </TouchableOpacity>
          <View style={styles.headerDrawer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.facetsSummaryText}>Available Credits</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.balanceSummaryText}>{Number(balance).toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.midSection}>
            <View>
              <Text style={styles.emailText}>{(userDetails) ? userDetails.email : ''}</Text>
            </View>
            <View>
              <Text style={styles.creditText}>Enter credit to apply at checkout</Text>
            </View>
            <View>
              <TextInput
                style={styles.inputField}
                placeholder="$0.00"
                placeholderTextColor="#000"
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.checkoutBtn}>
                <Text style={styles.checkoutText}>Apply to checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>Recent activity</Text>
              <Text style={styles.listHeaderText}>Available</Text>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={activityData}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.column1}>{(item.note) ? item.note : 'Your credit balance was ' + item.type + ' to ' + item.transaction }</Text>
                  <View style={styles.column2Container}>
                    <Text style={styles.transText}>
                      ${item.transaction}
                    </Text>
                    <Text style={styles.dateText}>
                      {formatDate(item.date)}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const formatDate = (inputDate) => {
  const dataString = new Date(inputDate);
  const options = {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dataString);
  return formattedDate;
};

export default Balance;

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    height: '100%',
    top: 75,
    borderTopColor: '#FFFFFF',
    borderWidth: 0.2,
    backgroundColor: '#FFFFFF',
  },
  headerDrawer: {
    width: 330,
    height: 50,
    gap: 4,
    marginTop: 20,
    position: 'relative'
  },
  facetsSummaryText: {
    fontSize: 19,
    fontWeight: '400',
    left: 20,
    height: 26,
    color: '#000000',
  },
  balanceSummaryText: {
    fontSize: 30,
    fontWeight: '400',
    left: 20,
    height: 35,
    color: '#000000',
  },
  midSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emailText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000'
  },
  creditText: {
    fontSize: 16
  },
  inputField: {
    marginTop: 20,
    width: 330,
    height: 55,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#ddd',
    color: '#000',
    padding: 10
  },
  checkoutBtn: {
    marginTop: 10,
    width: 330,
    padding: 15,
    backgroundColor: '#fcdc1a',
    alignSelf: 'center',
    borderRadius: 20
  },
  checkoutText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
    textAlign: 'center'
  },
  ModalClose: {
    top: 20,
    left: 360,
    position: 'absolute'
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  listHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  column1: {
    width: 200
  },
  column2Container: {
    width: 100,
  },
  transText: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dateText: {
    textAlign: 'right',
    right: 5
  }
});
