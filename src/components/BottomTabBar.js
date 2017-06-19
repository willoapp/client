import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../assets/styles/colors';

export default class BottomTabBar extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  _active(tab) {
    return tab === this.props.activeTab ? styles.active : null;
  }

  _onPress(tab) {
    this.props.onTabChange(tab);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>

          <TouchableOpacity style={styles.tabContainer} onPress={() => this._onPress('activity')}>
            <Icon name="home" style={[styles.icon, this._active('activity'), {fontSize: 32}]}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabContainer} onPress={() => this._onPress('calendar')}>
            <Icon name="calendar" style={[styles.icon, this._active('calendar')]}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabContainer} onPress={() => this._onPress('invitations')}>
            <Icon name="envelope" style={[styles.icon, this._active('invitations')]}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabContainer} onPress={() => this._onPress('profile')}>
            <Icon name="user" style={[styles.icon, this._active('profile')]}/>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    borderTopColor: colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.bggray,
    height: 45,
  },
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  tabContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontSize: 24,
    // Padding to alleviate buggy side clipping
    paddingRight: 5,
    paddingLeft: 5,
    color: colors.gray
  },
  active: {
    color: colors.blue
  }
});