import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
} from 'react-native'

export default class TitleText extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Text style={[this.props.style, styles.titleText]}>{this.props.children}</Text>
    )
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: '700',
    fontFamily: 'Helvetica',
    fontSize: 24
  }
})