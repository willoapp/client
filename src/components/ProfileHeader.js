import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import Avatar from './Avatar'
import Icon from 'react-native-vector-icons/FontAwesome'

import colors from '../assets/styles/colors'
import spacing from '../assets/styles/spacing'
import fontSizes from '../assets/styles/fontSizes'

export default class ProfileHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.normal }} >
        <Avatar size={75} changeable={true}/>

        <View style={{ marginLeft: spacing.xsmall }}>
          <Text style={{ color: colors.slate, fontWeight: 'bold' }}>Max Harris</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="gift" style={{ fontSize: fontSizes.small, marginRight: spacing.xxsmall, color: colors.gray }}/>
            <Text style={{ color: colors.gray }}>July 1</Text>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.editProfileButton} onPress={() => this.props.onEditPress()}>
            <Text style={{ color: colors.blue }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  editProfileButton: {
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingTop: spacing.xxsmall,
    paddingBottom: spacing.xxsmall,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.blue
  }
})