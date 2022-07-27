/* eslint-disable */

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  useColorScheme,
  View,
  ImageBackground,
  BackHandler,
  StyleSheet,
} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Home } from './src/screens';

export type RootParamList = {
  Example: undefined;
};

const App = gestureHandlerRootHOC(() => {
  return (
    <>
      <View style={{ top: 500 }}>
        <Home></Home>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default App;
