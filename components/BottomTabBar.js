import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

export default class BottomTabBar extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.tabContainer}>
            <Text>On Top</Text>
            <Text>First</Text>
          </View>
          <View style={styles.tabContainer}>
            <Text>Second</Text>
          </View>
          <View style={styles.tabContainer}>
            <Text>Third</Text>
          </View>
          <View style={styles.tabContainer}>
            <Text>Fourth</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fafafa',
    height: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  tabContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});