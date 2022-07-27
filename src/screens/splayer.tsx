import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import dings from './rain.mp3';

var Sound = require('react-native-sound');

Sound.setCategory('Playback');

var ding = new Sound(dings, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      ding.getDuration() +
      'number of channels: ' +
      ding.getNumberOfChannels(),
  );
});
export const Splay = () => {
  useEffect(() => {
    ding.setSystemVolume(1);
    return () => {
      ding.release();
    };
  }, []);
  const playPause = () => {
    ding.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.playBtn} onPress={playPause}>
        <Image source={require('./rainf.png')} style={styles.bubbleImg} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  bubbleImg: {
    width: 60,
    borderRadius: 4,
    height: 60,
    right: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  playBtn: {
    padding: 20,
  },
});
