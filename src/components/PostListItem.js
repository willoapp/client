import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import colors from '../assets/styles/colors';
import fontSizes from '../assets/styles/fontSizes';
import spacing from '../assets/styles/spacing';
import MyText from './MyText';
import Icon from 'react-native-vector-icons/FontAwesome';

import { fromNow } from '../utils/moment';

PostAlert = (props) => {
  // TODO: Only show if p.created/updatedAt is < user.lastViewedActivityAt
  const p = props.post;
  return <Icon name="circle" style={styles.alert}/>
}

export default class PostListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
          {/* Left - activity indicator */}
          <View style={styles.alertContainer}>
            <PostAlert post={this.props.post} />
          </View>

          {/* Right - everything else */}
          <View style={{flex: 1}}>
            <View style={styles.contentContainer}>
              <View style={styles.header}>
                <MyText style={styles.user}>{this.props.post.user.firstName}</MyText>
                <MyText style={styles.time}>{fromNow(this.props.post.createdAt)}</MyText>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{flex: 1, width: 0}}>{this.props.post.content}</Text>
              </View>
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
    justifyContent: 'flex-start'
  },
  alertContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20
  },
  alert: {
    fontSize: 6,
    color: colors.brick
  },

  contentContainer: {
    // backgroundColor: 'powderblue',
    paddingRight: spacing.normal,
    paddingTop: spacing.xsmall,
    paddingBottom: spacing.xsmall,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xxsmall
  },
  user: {
    fontWeight: 'bold'
  },
  time: {
    fontSize: fontSizes.xsmall,
    color: colors.gray,
  }
});