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

import { User } from '../types'

interface IProfileHeaderProps {
  user: User,
  onChangeAvatar: Function,
  onEditPress: Function,
}

export default class ProfileHeader extends Component<IProfileHeaderProps> {
  constructor(props) {
    super(props)
  }

  fullName(user) {
    if (user) return `${user.firstName} ${user.lastName}`
    return ''
  }

  render() {
    const { user } = this.props
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.normal }} >
        <Avatar size={75} changeable={true} src={user.photoURL} onChange={() => this.props.onChangeAvatar()}/>

        <View style={{ marginLeft: spacing.xsmall }}>
          <Text style={{ color: colors.slate, fontWeight: 'bold' }}>{this.fullName(user)}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {
              user && user.birthDate ?
                <View>
                  <Icon name='gift' style={{ fontSize: fontSizes.small, marginRight: spacing.xxsmall, color: colors.gray }}/>
                  <Text style={{ color: colors.gray }}>{user.birthDate}</Text>
                </View> : null
            }
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