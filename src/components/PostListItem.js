import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import colors from '../assets/styles/colors';
import MyText from './MyText';
import Icon from 'react-native-vector-icons/FontAwesome';

PostAlert = (props) => {
  // TODO: Only show if p.created/updatedAt is < user.lastViewedActivityAt
  const p = props.post;
  return <Icon name="circle" style={styles.alert}/>
}

export default class PostListItem extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    this.props.onPressItem(this.props.post)
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress} style={styles.container}>
          {/* Left - activity indicator */}
          <View style={styles.alertContainer}>
            <PostAlert post={this.props.post} />
          </View>

          {/* Right - everything else */}
          <View style={{flex: 1}}>
            <View style={styles.contentContainer}>
              <View style={styles.header}>
                <MyText style={styles.user}>{"this.props.post.user.username"}</MyText>
                <MyText style={styles.time}>yesterday</MyText>
              </View>
              <Text>{this.props.post.content}</Text>
            </View>

            <View style={styles.divider}/>
          </View>
      </TouchableOpacity>
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
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  user: {
    fontWeight: 'bold'
  },
  time: {
    fontSize: 12
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray
  }
});