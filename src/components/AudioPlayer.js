import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer from 'react-native-track-player';
import config from './../config/config';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, gql } from '@apollo/client';

const AudioPlayer = ({metafields, trackId}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [trackUrl, setTrackUrl] = useState('');
  const apiEndpoint = `${config.shopifyStoreUrl}/admin/api/${config.apiVersion}/graphql.json`;
  const client = new ApolloClient({
    link: new HttpLink({
      uri: apiEndpoint,
      headers: {
        'X-Shopify-Access-Token': config.shopifyApiKey,
      },
    }),
    cache: new InMemoryCache(),
  });
  const GET_AUDIO_FILE = gql`
    query GetAudioFile($gid: ID!) {
      node(id: $gid) {
        ... on GenericFile {
          url
          mimeType
        }
      }
    }
  `;
  useEffect(() => {
    if (metafields.length > 0) {
      TrackPlayer.setupPlayer()
      client.query({
        query: GET_AUDIO_FILE,
        variables: {
          gid: metafields[0].value
        },
      }).then(response => {
        setTrackUrl(response.data.node.url)
      });
    }
  }, []);

  const playAudio = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.seekTo(0);
      await TrackPlayer.reset();
      TrackPlayer.add({
        id: trackId,
        url: trackUrl
      });
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const progressInterval = setInterval(async () => {
      if (isPlaying) {
        const position = await TrackPlayer.getPosition();
        const duration = await TrackPlayer.getDuration();
        setCurrentTime(position);
        setTotalDuration(duration);
        setProgress(position);
      }
    }, 1000);

    return () => {
      clearInterval(progressInterval);
    };
  }, [isPlaying, progress]);

  return (
    <View style={styles.audioContainer}>
      <TouchableOpacity onPress={playAudio}>
        <Image
          source={isPlaying ? require('../../images/pause.png') : require('../../images/play.png')}
          style={{ width: 18, height: 18 }}
        />
      </TouchableOpacity>
      <Text style={{ marginLeft: 5 }}>{formatTime(currentTime)}/{formatTime(totalDuration)}</Text>
      <Slider
        style={{ width: 68 }}
        minimumValue={0}
        maximumValue={totalDuration}
        value={progress}
        onValueChange={(value) => TrackPlayer.seekTo(value)}
      />
      <TouchableOpacity onPress={toggleMute}>
        <Image
          source={isMuted ? require('../../images/speaker-mute.png') : require('../../images/speaker.png')}
          style={{ width: 18, height: 18 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  audioContainer: {
    flexDirection: 'row',
    marginTop: 105,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c9d3d8',
    height: 50,
    borderRadius: 50,
  },
});

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};