import React, {Component} from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import colors from '../assets/styles/colors'
import max from 'lodash-es/max'
import floor from 'lodash-es/floor'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Avatar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { src, changeable } = this.props
    const image = src ? {uri: src} : require('../assets/images/avatar-default.png')
    const size = this.props.size ? max([this.props.size, 25]) : 100 // Minimum size is 25, default is 100

    return (
      <View>
        {changeable ?
          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center', right: 0, bottom: 0, position: 'absolute', zIndex: 2, backgroundColor: colors.blue, borderWidth: 3, borderColor: colors.white, width: size/3, height: size/3, borderRadius: size/6}}
            onPress={() => this.props.onChange()}>
            <Icon name="plus" style={{fontSize: 15, color: colors.white}} />
          </TouchableOpacity>
          : null}
        <Image style={{zIndex: 1, width: size, height: size, borderRadius: size/2, resizeMode: 'contain'}} source={image} />
      </View>
    )
  }
}