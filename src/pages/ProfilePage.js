import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import HeaderNav from '../components/HeaderNav';
import colors from '../assets/styles/colors';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sessionActions from '../actions/sessionActions';
import uiActions from '../actions/uiActions';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    this.props.sessionActions.logout();
    this.props.uiActions.setPage('signup');
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderNav/>
        <Text>This is the profile page</Text>
        <Button
          onPress={() => this.logout()}
          title="Log out"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bglightgray,
  }
});

export default connect(state => ({
    state
  }),
  dispatch => ({
    uiActions: bindActionCreators(uiActions, dispatch),
    sessionActions: bindActionCreators(sessionActions, dispatch)
  })
)(ProfilePage);