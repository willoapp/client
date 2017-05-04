import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ActivityPage from './pages/ActivityPage';
import TreePage from './pages/TreePage';
import AddPage from './pages/AddPage'
import ProfilePage from './pages/ProfilePage';
import BottomTabBar from './BottomTabBar';


function ActivePage(props) {
  if (props.page === 'activity') {
    return <ActivityPage/>;
  } else if (props.page === 'tree') {
    return <TreePage/>
  } else if (props.page === 'add') {
    return <AddPage/>
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
      <View style={styles.container}>
        <ActivePage page={this.state.page}/>
        <BottomTabBar activeTab={this.state.page} onTabChange={this.handleTabChange}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

