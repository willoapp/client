import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import HeaderNav from '../components/HeaderNav';
import colors from '../assets/styles/colors';

export default class AddPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HeaderNav/>
        <Text>This is the add page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bglightgray,
  }
});