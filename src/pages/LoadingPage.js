import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import colors from '../assets/styles/colors';

export default class LoadingPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.whiteText}>Loading...</Text>
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