import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import colors from '../assets/styles/colors'
import fontSizes from '../assets/styles/fontSizes'
import spacing from '../assets/styles/spacing'
import MyText from './MyText'
import Icon from 'react-native-vector-icons/FontAwesome'
import Avatar from './Avatar';

import { fromNow } from '../utils/moment'

export default class PostListItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const firstItemInListMarginTop = this.props.index === 0 ? spacing.backgroundWidth : 0
    return (
      <View style={[styles.container, { marginTop: firstItemInListMarginTop }]}>
        {/* Left - activity indicator */}
        <View style={styles.avatarContainer}>
          <Avatar style={styles.avatarContainer} size={45} />
        </View>

        {/* Right - everything else */}
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <MyText style={styles.user}>{this.props.post.user.firstName}</MyText>
            <MyText style={styles.time}>{fromNow(this.props.post.createdAt)}</MyText>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 1, width: 0}}>{this.props.post.content}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
    paddingTop: spacing.xsmall,
    paddingBottom: spacing.xsmall,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xsmall,
  },
  alert: {
    fontSize: 6,
    color: colors.brick
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xxsmall
  },
  user: {
    fontWeight: 'bold',
    color: colors.slate,
  },
  time: {
    fontSize: fontSizes.xsmall,
    color: colors.gray,
  }
})