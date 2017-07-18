/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  StatusBar,
} from 'react-native'
import App from './src/App'
import { Provider } from 'react-redux'
import store from '.src/reducers'

export default class client extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar barStyle='dark-content'/>
          <App/>
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('client', () => client)
