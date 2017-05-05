import React, { Component } from 'react';
import {
  Text
} from 'react-native';

export default class MyText extends Component {
  constructor(props) {
    super(props);
    this.fontFamily = this.fontFamily.bind(this);
  }

  fontFamily() {
    this.props.fontWeight && this.props.fontWeight === 'bold' ? 'Comic Sans MS - Bold' : 'Comic Sans MS';
  }

  render() {
    return (
      <Text style={[this.props.style, {fontFamily: this.fontFamily()}]}>{this.props.children}</Text>
    )
  }
}