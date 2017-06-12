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

function ActivePage(props) {
  if (props.page === 'activity') {
    return <ActivityPage/>;
  } else if (props.page === 'tree') {
    return <CalendarPage/>
  } else if (props.page === 'add') {
    return <InvitationsPage/>
  } else if (props.page === 'profile') {
    return <ProfilePage/>
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { page: "activity" }
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(newPage) {
    this.setState({ page: newPage });
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <ActivePage page={this.state.page}/>
          <BottomTabBar activeTab={this.state.page} onTabChange={this.handleTabChange}/>
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

