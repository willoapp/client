import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ActivityFeedPage from './pages/ActivityFeedPage';
import BottomTabBar from './BottomTabBar';

function ActivePage() {
  if (true) /* Some Logic for displaying page */
  return <ActivityFeedPage/>;
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivePage/>
        <BottomTabBar/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

