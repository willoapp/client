import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet } from 'react-native';

import colors from '../../assets/styles/colors';
import spacing from '../../assets/styles/spacing';
import fontSizes from '../../assets/styles/fontSizes';

export default class AddActivityPage extends Component {

  // addPost() {
  //   const post = { content: this.state.text, userId: "58d9eafafa8beec1b2c33cbb" }
  //   this.props.postActions.addPost(post);
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Some Activity</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate
  }
});