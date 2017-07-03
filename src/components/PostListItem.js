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
import Avatar from './Avatar'
import get from 'lodash-es/get'

import { fromNow } from '../utils/moment'

export default class PostListItem extends Component {
  constructor(props) {
    super(props)
  }

  toggleLike(post, user) {
    this.props.postActions.toggleLike(post)
  }

  isLikedByCurrentUser(post, currentUser) {
    return get(post, ['likedBy', get(currentUser, 'id')], false)
  }

  render() {
    const firstItemInListMarginTop = this.props.index === 0 ? spacing.backgroundWidth : 0
    const post = this.props.post
    const user = this.props.user
    return (
      <View style={[styles.container, { marginTop: firstItemInListMarginTop }]}>
        {/*Top*/}
        <View style={styles.alignRowWithPadding}>
          {/* Left - activity indicator */}
          <View style={styles.leftColumn}>
            <Avatar size={45} />
          </View>

          {/* Right - everything else */}
          <View style={{flex: 1}}>
            <View style={styles.header}>
              <MyText style={styles.user}>{post.user.firstName}</MyText>
              <MyText style={styles.time}>{fromNow(post.createdAt)}</MyText>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{flex: 1, width: 0}}>{post.content}</Text>
            </View>
          </View>
        </View>

        {/*Pictures*/}
        <View>

        </View>

        {/*Liking*/}
        <View style={[styles.alignRowWithPadding, {marginTop: spacing.xsmall}]}>
          <View style={styles.leftColumn}>
            <Icon name={this.isLikedByCurrentUser(post, user) ? 'heart' : 'heart-o'} style={{fontSize: 20}} onPress={() => this.toggleLike(post)}/>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 14, color: colors.textMuted}}>
              {this.isLikedByCurrentUser(post, user) ? 'You like this' : 'Be the first to like this'}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: spacing.xsmall,
    paddingBottom: spacing.xsmall,
  },
  alignRowWithPadding: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
  },
  leftColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    marginRight: spacing.xsmall,
  },
  alert: {
    fontSize: 6,
    color: colors.brick
  },
  header: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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