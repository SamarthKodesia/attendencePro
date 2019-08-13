/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppState,
  Alert
} from "react-native";
/*
Importing all screens
 */
import UserLogin from './components/screens/user.login';
import mainScreen from './components/screens/main';
//import reader from './components/screens/reader';

import { createStackNavigator, createAppContainer } from 'react-navigation';

const RootStack = createStackNavigator(
  {
    // 'UserLogin': UserLogin,
    // 'MainScreen': mainScreen,
    //Reader: reader
    Home: {
      screen: UserLogin,
      navigationOptions: {
       header: null
      }
     },
     main: {
      screen: mainScreen,
      navigationOptions: {
       header: null
      }
     }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer( RootStack );

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
