import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import colors from '../assets/styles/colors'
import fontSizes from '../assets/styles/fontSizes'
import spacing from '../assets/styles/spacing'
import Icon from 'react-native-vector-icons/FontAwesome'
import Avatar from './Avatar'
import LoveCount from './LoveCount'
import get from 'lodash-es/get'

import { fromNow } from '../utils/moment'

export default class PostListItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { post, lovedByCurrentUser, onToggleLove } = this.props
    return (
      <View style={styles.container}>
        {/*Top*/}
        <View style={styles.alignRowWithPadding}>
          {/* Left - activity indicator */}
          <View style={styles.leftColumn}>
            <Avatar size={55} src={post.user.photoURL}/>
          </View>

          {/* Right - everything else */}
          <View style={{flex: 1}}>
            <View style={styles.header}>
              <Text style={styles.user}>{post.user.firstName}</Text>
              <Text style={styles.time}>{fromNow(post.createdAt)}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.content}>{post.content}</Text>
            </View>
          </View>
        </View>

        {/*Pictures*/}
        <View>

        </View>

        {/*Liking*/}
        <View style={[styles.alignRowWithPadding, {marginTop: spacing.xsmall}]}>
          <View style={styles.leftColumn}>
            <Icon name={lovedByCurrentUser ? 'heart' : 'heart-o'} style={[{fontSize: 24}, {color: lovedByCurrentUser ? colors.seaside : colors.darkgray}]} onPress={() => onToggleLove(!lovedByCurrentUser)}/>
          </View>
          <View style={{flex: 1}}>
            <LoveCount loveCount={post.loveCount} lovedByCurrentUser={lovedByCurrentUser}/>
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
    fontSize: fontSizes.normal,
    fontWeight: 'bold',
    color: colors.slate,
  },
  content: {
    flex: 1,
    width: 0,
    fontSize: fontSizes.normal,
  },
  time: {
    fontSize: fontSizes.xsmall,
    color: colors.gray,
  }
})