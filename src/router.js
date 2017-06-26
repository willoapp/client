import React from 'react';
import {
  Text,
  StyleSheet
 } from 'react-native';
import colors from './assets/styles/colors';
import spacing from './assets/styles/spacing';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import ActivityPage from './pages/tabs/ActivityPage';
import CalendarPage from './pages/tabs/CalendarPage';
import InvitationsPage from './pages/tabs/InvitationsPage';
import ProfilePage from './pages/tabs/ProfilePage';
import HeaderNav from './components/HeaderNav';

import AddActivityPage from './pages/activity/AddActivityPage';

export const ActivityStack = StackNavigator({
  ActivityPage: {
    screen: ActivityPage,
    navigationOptions: {
      title: 'Activity'
    }
  },
});

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
  // swipeEnabled: true,
  // animationEnabled: true,
  lazy: true,
  tabBarOptions: {
    inactiveTintColor: colors.gray,
    activeTintColor: colors.blue,
    showLabel: false
  }
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      header: () => (
        <HeaderNav/>
      )
    }
  },
  AddActivityPage: {
    screen: AddActivityPage,
  }
}, {
  mode: 'modal',
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