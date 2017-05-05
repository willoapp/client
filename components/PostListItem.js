import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import colors from '../assets/styles/colors';
import MyText from './MyText';

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
      <TouchableOpacity onPress={this._onPress}>
        <View style={{flex: 1, padding: 20}}>
          <View style={styles.header}>
            <MyText style={styles.user}>{this.props.post.user.username}</MyText>
            <MyText style={styles.time}>yesterday</MyText>
          </View>
          <View style={styles.content}>
            <Text>{this.props.post.content}</Text>
          </View>
        </View>
        <View style={styles.divider}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  user: {
    fontWeight: 'bold'
  },
  time: {
    fontSize: 12
  },
  content: {
    marginTop: 10
  },
  divider: {
    flex: 1,
    marginLeft: 20,
    height: 1,
    backgroundColor: colors.gray
  }
});