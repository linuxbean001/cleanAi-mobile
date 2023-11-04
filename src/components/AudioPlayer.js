import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer from 'react-native-track-player';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.add({
        id: 'trackId',
        url: require('../../sample-15s.mp3'),
        title: 'Sample Track',
        artist: 'Sample Artist',
        artwork: 'cover.png',
      });
    });
  }, []);

  const playAudio = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    // You can control mute/unmute based on your requirements
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
          source={isPlaying ? require('../../pause.png') : require('../../play.png')}
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
          source={isMuted ? require('../../speaker-mute.png') : require('../../speaker.png')}
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

export {};