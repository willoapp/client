import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
} from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';

import colors from '../../assets/styles/colors';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sessionActions from '../../actions/sessionActions';
import uiActions from '../../actions/uiActions';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    this.props.sessionActions.logout();
    this.props.uiActions.setPage('signup');
  }

  onEditPress() {
    console.log('Edit was pressed');
  }

  render() {
    return (
      <View style={styles.container}>
        <ProfileHeader onEditPress={() => this.onEditPress()}/>
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