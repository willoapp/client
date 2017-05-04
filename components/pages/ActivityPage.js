import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import HeaderNav from '../HeaderNav';
import PostList from '../PostList';
import colors from '../../assets/styles/colors';

export default class ActivityPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HeaderNav/>
        <PostList/>
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