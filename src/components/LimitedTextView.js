import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const LimitedTextView = ({ text, maxLength }) => {
  const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

  return (
    <View>
      <Text style={styles.titleText}>{truncatedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: '#000'
  }
});

export default LimitedTextView;