import React from 'react';
import { StyleSheet } from 'react-native';
import colors from './assets/styles/colors';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import ActivityPage from './pages/tabs/ActivityPage';
import CalendarPage from './pages/tabs/CalendarPage';
import InvitationsPage from './pages/tabs/InvitationsPage';
import ProfilePage from './pages/tabs/ProfilePage';

export const Tabs = TabNavigator({
  ActivityPage: {
    screen: ActivityPage,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" style={[styles.icon, {fontSize: 32, color: tintColor}]} />
      )
    }
  },
  CalendarPage: {
    screen: CalendarPage,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="calendar" style={[styles.icon, {color: tintColor}]} />
      )
    }
  },
  InvitationsPage: {
    screen: InvitationsPage,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="envelope" style={[styles.icon, {color: tintColor}]} />
      )
    }
  },
  ProfilePage: {
    screen: ProfilePage,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" style={[styles.icon, {color: tintColor}]} />
      )
    }
  }
}, {
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    inactiveTintColor: colors.gray,
    activeTintColor: colors.blue,
    showLabel: false
  }
});

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
    // Padding to alleviate buggy side clipping
    color: colors.gray
  },
  active: {
    color: colors.blue
  }
});