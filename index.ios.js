/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import HeaderNav from './components/HeaderNav';

export default class client extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  addActivityItem(text) {

  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Text>Enter a new event:</Text>
        <TextInput
          style={{height: 30, marginTop: 20, marginBottom: 20, paddingLeft: 20, paddingRight: 20, borderWidth: 1, borderColor: '#000000'}}
          placeholder="Something"
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          onPress={() => this.addActivityItem(this.state.text)}
          title="Add"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // justifyContent: primary axis
  // alignItems: secondary axis
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('client', () => client);
