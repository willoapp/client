import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import colors from '../assets/styles/colors'

export default class HeaderNav extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.buffer}/>
        <View style={styles.container}>
          <View style={styles.cutoffBottom}>
            <Text style={styles.logo}>Willo</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairlinegray,
  },
  buffer: {
    height: 10
  },
  container: {
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cutoffBottom: {
    height: 50,
    overflow: 'hidden'
  },
  logo: {
    paddingRight: 5,
    paddingLeft: 5,
    fontFamily: 'Sacramento-Regular',
    fontSize: 36,
    color: colors.seaside
  }
})
