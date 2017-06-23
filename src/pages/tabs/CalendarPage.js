import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import colors from '../../assets/styles/colors';

export default class CalendarPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Calendar Page</Text>
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