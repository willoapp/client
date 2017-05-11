/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StatusBar,
} from 'react-native'
import App from './src/App';

export default class client extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        <App/>
      </View>
    );
  }
}

AppRegistry.registerComponent('client', () => client);
