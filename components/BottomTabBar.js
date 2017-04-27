import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class BottomTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'activity'
    }
  }

  _active(tab) {
    return tab === this.state.activeTab ? styles.active : null;
  }

  _onPress(tab) {
    this.setState({ activeTab: tab });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.tabContainer} onPress={() => this._onPress('activity')}>
            <Icon name="ios-chatbubbles" style={[styles.icon, this._active('activity')]}/>
            <Text style={[styles.subtext, this._active('activity')]}>Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabContainer} onPress={() => this._onPress('tree')}>
            <Icon name="md-git-network" style={[styles.icon, this._active('tree')]}/>
            <Text style={[styles.subtext, this._active('tree')]}>Tree</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabContainer} onPress={() => this._onPress('add')}>
            <Icon name="md-add" style={[styles.icon, this._active('add')]}/>
            <Text style={[styles.subtext, this._active('add')]}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabContainer} onPress={() => this._onPress('profile')}>
            <Icon name="md-person" style={[styles.icon, this._active('profile')]}/>
            <Text style={[styles.subtext, this._active('profile')]}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fafafa',
    height: 50,
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
    fontSize: 30,
    color: "#9B9B9B"
  },
  subtext: {
    color: "#9B9B9B"
  },
  active: {
    color: "#186CAA"
  }
});