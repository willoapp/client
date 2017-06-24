import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../assets/styles/colors';

export default class HeaderNav extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.buffer}/>
        <View style={styles.container}>
          <View style={styles.cutoffBottom}>
            <Text style={styles.logo}>Willow</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.seaside
  },
  buffer: {
    height: 10
  },
  container: {
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cutoffBottom: {
    height: 45,
    overflow: 'hidden'
  },
  logo: {
    paddingRight: 5,
    paddingLeft: 5,
    fontFamily: 'Sacramento-Bold',
    fontSize: 36,
    color: 'white'
  }
});
