import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const AutoComplete = ({ selectedCountry }) => {
  return (
    <>
      <GooglePlacesAutocomplete
        placeholder='Address'
        minLength={2}
        autoFocus={true}
        returnKeyType={'search'}
        listViewDisplayed='auto'
        fetchDetails={true}
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
          alert(data.description)
        }}
        getDefaultValue={() => ''}
        query={{
          key: 'AIzaSyDb9Sj-jpHwbEX06KgZOsse3Pt6ASvIYh4',
          language: 'en',
          types: '(cities)',
          components: selectedCountry ? `country:${selectedCountry}` : null
        }}
        styles={{
          container: {
            borderWidth: 1,
            width: 380,
            borderColor: '#ddd',
            marginTop: 5,
            marginBottom: 5
          },
          description: {
            fontWeight: 'bold',
            color: '#000'
          },
          textInput: {
            color: '#000'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
        textInputProps={{
          placeholderTextColor: '#000'
        }}
        nearbyPlacesAPI='GooglePlacesSearch'
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          types: 'food'
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        debounce={200}
      />
    </> 
  );
};

export default AutoComplete;
