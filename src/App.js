import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ActivityPage from './pages/ActivityPage';
import CalendarPage from './pages/CalendarPage';
import InvitationsPage from './pages/InvitationsPage';
import ProfilePage from './pages/ProfilePage';
import BottomTabBar from './components/BottomTabBar';

import { Provider } from 'react-redux';
import store from './reducers';

function ActivePageForTab(props) {
  if (props.tab === 'activity') {
    return <ActivityPage/>;
  } else if (props.tab === 'calendar') {
    return <CalendarPage/>
  } else if (props.tab === 'invitations') {
    return <InvitationsPage/>
  } else if (props.tab === 'profile') {
    return <ProfilePage/>
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: 'activity' }
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(tab) {
    this.setState({ tab });
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <ActivePageForTab tab={this.state.tab}/>
          <BottomTabBar activeTab={this.state.tab} onTabChange={this.handleTabChange}/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

