import React from 'react'
import {
  Text,
  StyleSheet
} from 'react-native'
import colors from './assets/styles/colors'
import spacing from './assets/styles/spacing'
import fontSizes from './assets/styles/fontSizes'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import ActivityPage from './pages/tabs/ActivityPage'
import CalendarPage from './pages/tabs/CalendarPage'
import MapPage from './pages/tabs/MapPage'
import MessagesPage from './pages/tabs/MessagesPage'
import ProfilePage from './pages/tabs/ProfilePage'
import HeaderNav from './components/HeaderNav'

import AddActivityPage from './pages/activity/AddActivityPage'

import get from 'lodash-es/get'

export const ActivityStack = StackNavigator({
  ActivityPage: {
    screen: ActivityPage,
    navigationOptions: {
      title: 'Activity'
    }
  },
})

export const Tabs = TabNavigator({
  ActivityPage: {
    screen: ActivityPage,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" style={{fontSize: 31, color: tintColor}} />
      )
    }
  },
  CalendarPage: {
    screen: CalendarPage,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="calendar" style={{fontSize: 23, color: tintColor}} />
      )
    }
  },
  MapPage: {
    screen: MapPage,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="globe" style={{fontSize: 26, color: tintColor}} />
      )
    }
  },
  MessagesPage: {
    screen: MessagesPage,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="comment" style={{fontSize: 25, color: tintColor}} />
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
})

const RootCardNavigator = StackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      header: (navigator) => (
        <HeaderNav onProfilePress={() => {
          navigator.navigation.navigate('ProfilePage')
        }}/>
      )
    }
  },
  ProfilePage: {
    screen: ProfilePage,
    navigationOptions: navigator => {
      return {
        title: get(navigator, 'navigation.state.params.title', 'My Profile'),
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle
      }
    }
  }
}, {
  mode: 'card',
  headerMode: 'float'
})

export const RootModalNavigator = StackNavigator({
  RootCardNavigator: {
    screen: RootCardNavigator,
    navigationOptions: {
      header: null
    }
  },
  AddActivityPage: {
    screen: AddActivityPage,
    navigationOptions: navigator => {
      const text = navigator.navigation.state.params.text
      const user = navigator.navigation.state.params.user
      const addPost = navigator.navigation.state.params.addPost
      const props = navigator.navigation.state.params.props
      return {
        title: 'Update Activity',
        headerLeft: <Text style={{ color: colors.slate, marginLeft: spacing.small, fontSize: fontSizes.normal }} onPress={() => { navigator.navigation.goBack() }}>Cancel</Text>,
        headerRight: <Text style={{ color: colors.slate, marginRight: spacing.small, fontSize: fontSizes.normal, fontWeight: 'bold' }} onPress={() => addPost(text, user, props)}>Post</Text>,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle
      }
    }
  }
}, {
  mode: 'modal'
})

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray
  },
  headerTitle: {
    color: colors.seaside
  }
})

// const MainCardNavigator = StackNavigator(
//   {
//     Home: { screen: Home },
//     CardScreen1: { screen: CardScreen1 },
//     CardScreen2: { screen: CardScreen2 },
//   },
//   {
//     headerMode: 'none',
//   },
// );

// const MainModalNavigator = StackNavigator(
//   {
//     MainCardNavigator: { screen: MainCardNavigator },
//     ModalScreen1: { screen: ModalScreen1 },
//     ModalScreen2: { screen: ModalScreen2 },
//   },
//   {
//     mode: 'modal',
//     headerMode: 'none',
//   },
// );