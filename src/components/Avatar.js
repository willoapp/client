import React, {Component} from 'react';
import {
  View,
  Image,
} from 'react-native';
import colors from '../assets/styles/colors';
import max from 'lodash-es/max';
import floor from 'lodash-es/floor';

export default class Avatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const src = this.props.src ? this.props.src : require('../assets/images/avatar-default.png');
    const size = this.props.size ? max([this.props.size, 25]) : 100; // Minimum size is 25, default is 100

    return (
      <Image style={{width: size, height: size, borderRadius: size/2, borderColor: colors.aqua, borderWidth: floor(size/25)}} source={src} />
    )
  }
}