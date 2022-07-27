/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  TextStyle,
  Image,
  PermissionsAndroid,
} from 'react-native';

import dings from './rain.mp3';
import {
  HapticModeEnum,
  PanDirectionEnum,
  Slider,
} from 'react-native-awesome-slider';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '../components';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { palette } from '../../../src/theme/palette';
import LottieView from 'lottie-react-native';
import { useTheme } from '@react-navigation/native';
import { transform } from 'typescript';
import { Splay } from './splayer';
import RNFetchBlob from 'rn-fetch-blob';
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const TITLE: TextStyle = {
  marginBottom: 12,
};

var Sound = require('react-native-sound');

Sound.setCategory('Playback');

let url =
  'https://audio-previews.elements.envatousercontent.com/files/281313173/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22UPA6GE2-rain.mp3%22';

//..............................DOWNLOADING CODE
requestToPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Music',
        message: 'App needs access to your Files... ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('startDownload...');
      this.startDownload();
    }
  } catch (err) {
    console.log(err);
  }
};

startDownload = () => {
  // const { tunes, token, currentTrackIndex } = this.state;
  let name = 'rain';
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'mp3',
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title: name,
      path: RNFetchBlob.fs.dirs.DownloadDir + `${name}`, // Android platform
      description: 'Downloading the file',
    },
  })
    .fetch('GET', url)
    .then(res => {
      console.log('res', res);
      console.log('The file is save to ', res.path());
    });
};

///.......................

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

export const Home = () => {
  const progress3 = useSharedValue(30);
  const [vol, setVol] = useState(0.5);

  const min = useSharedValue(0);
  const max = useSharedValue(100);

  useEffect(() => {
    console.log(progress3);
    setVol(progress3);
    console.log(vol);

    // Permisiion and Download Called
    requestToPermissions();
    startDownload();
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
  /////////.............
  return (
    <>
      <View style={{ transform: [{ rotate: '-90deg' }] }}>
        <Slider
          progress={progress3}
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          bubbleWidth={200}
          bubbleTranslateY={0}
          renderThumb={() => (
            <View style={styles.customBubble}>
              <Image source={require('./rainf.png')} style={styles.bubbleImg} />
            </View>
          )}
          renderBubble={() => <View style={styles.customBubble}></View>}
          onValueChange={val => ding.setSystemVolume(Math.floor(val) / 100)}
        />
      </View>
      {/* music ........... */}
      <View style={styles.container}>
        <TouchableOpacity style={styles.playBtn} onPress={playPause}>
          <Image source={require('./rainf.png')} style={styles.bubbleImg} />
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  playBtn: {
    padding: 200,
  },
  card: {
    borderRadius: 8,
    borderWidth: 0.5,
    padding: 120,

    // borderColor: theme.colors.border,
    // backgroundColor: theme.colors.card,
  },
  full: {
    flex: 1,
  },
  header: {
    paddingBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: palette.Gray,
  },
  view: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  slider: {
    marginBottom: 20,
    marginTop: 12,
  },
  contentContainerStyle: {
    paddingBottom: 100,
  },
  container: {
    flex: 1,
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    flexWrap: 'wrap',
  },
  btn: {
    alignItems: 'center',
    height: 28,
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: palette.Info,
    marginRight: 12,
    marginTop: 12,
  },
  customThumb: {
    width: 20,
    height: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: palette.Danger,
  },
  customBubble: {
    alignItems: 'center',
  },
  bubbleImg: {
    width: 60,
    borderRadius: 4,
    height: 60,
  },
  borderRadius: {
    borderRadius: 20,
  },
});
