import React from 'react';
import { Text, View } from 'react-native';

const LimitedTextView = ({ text, maxLength }) => {
  const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

  return (
    <View>
      <Text>{truncatedText}</Text>
    </View>
  );
};

export default LimitedTextView;