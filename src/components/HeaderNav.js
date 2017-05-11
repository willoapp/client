import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class HeaderNav extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.buffer}/>
        <View style={styles.container}>
          <Text style={styles.logo}>OneBigHappy</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#1F6DA8"
  },
  buffer: {
    height: 10
  },
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    fontFamily: 'ComicSansMS-Bold',
    fontSize: 20,
    color: 'white'
  }
});
