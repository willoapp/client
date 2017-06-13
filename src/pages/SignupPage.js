import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import colors from '../assets/styles/colors';

export default class SignupPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus={true}
          style={{height: 40, backgroundColor: colors.white, paddingLeft: 20, paddingRight: 20, marginBottom: 5}}
          placeholder="First name"
          onChangeText={(text) => console.log(`First Name: ${text}`)}/>

        <TextInput
          autoFocus={true}
          style={{height: 40, backgroundColor: colors.white, paddingLeft: 20, paddingRight: 20, marginBottom: 5}}
          placeholder="Last name"
          onChangeText={(text) => console.log(`Last Name: ${text}`)}/>

        <TextInput
          autoFocus={true}
          style={{height: 40, backgroundColor: colors.white, paddingLeft: 20, paddingRight: 20, marginBottom: 5}}
          placeholder="Email"
          onChangeText={(text) => console.log(`Email: ${text}`)}/>

        <TextInput
          autoFocus={true}
          style={{height: 40, backgroundColor: colors.white, paddingLeft: 20, paddingRight: 20, marginBottom: 5}}
          placeholder="Password"
          onChangeText={(text) => console.log(`Password: ${text}`)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.seaside,
  },
  whiteText: {
    color: colors.white
  }
});