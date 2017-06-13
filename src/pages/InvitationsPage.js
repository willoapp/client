import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import HeaderNav from '../components/HeaderNav';
import colors from '../assets/styles/colors';

import graphqlService from '../services/graphqlService'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import postActions from '../actions/postActions';

class InvitationsPage extends Component {

  constructor(props) {
    super(props);
  }

  onTextChange(text) {
    this.setState({ text });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderNav/>

        <Text>Invitations</Text>

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

export default connect(null,
  (dispatch) => ({
    actions: bindActionCreators(postActions, dispatch)
  })
)(InvitationsPage);