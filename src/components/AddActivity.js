import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet } from 'react-native';

import colors from '../assets/styles/colors';
import spacing from '../assets/styles/spacing';
import fontSizes from '../assets/styles/fontSizes';

// {/*<TextInput
//           autoFocus={true}
//           style={styles.openAddActivity}
//           placeholder="Post something"
//           onChangeText={(text) => this.onTextChange(text)}/>*/}

export default class AddActivity extends Component {

  render() {
    return (
      <View style={styles.bottomBorder}>
        <TouchableOpacity style={styles.textInputMock} onPress={openAddPost}>
          <Text style={styles.placeholder}>Post something</Text>
        </TouchableOpacity>
      </View>
    )
  }

  onTextChange(text) {
    this.setState({ text });
  }
}

openAddPost = () => {
  console.log('opening a new popover screen');
}

const styles = StyleSheet.create({
  bottomBorder: {
    height: 50,
    borderBottomColor: colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textInputMock: {
    marginLeft: spacing.normal,
    flex: 1,
    justifyContent: 'center'
  },
  placeholder: {
    fontSize: fontSizes.normal,
    color: colors.gray,
    fontStyle: 'italic'
  },
});