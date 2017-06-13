import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
} from 'react-native';
import colors from '../assets/styles/colors';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sessionActions from '../actions/sessionActions';

class SignupPage extends Component {

  constructor(props) {
    super(props);
  }

  register(firstName, lastName, email, password) {
    this.props.sessionActions.register(firstName, lastName, email, password);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus={true}
          style={styles.fullInput}
          placeholder="First name"
          onChangeText={(firstName) => this.setState({ firstName })}/>

        <TextInput
          style={styles.fullInput}
          placeholder="Last name"
          onChangeText={(lastName) => this.setState({ lastName })}/>

        <TextInput
          style={styles.fullInput}
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}/>

        <TextInput
          style={styles.fullInput}
          placeholder="Password"
          onChangeText={(password) => this.setState({ password })}/>

        <Button
          onPress={() => this.register(this.state.firstName, this.state.lastName, this.state.email, this.state.password)}
          title="Sign Up"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.seaside,
  },
  whiteText: {
    color: colors.white
  },
  fullInput: {
    height: 40, backgroundColor: colors.white, paddingLeft: 20, paddingRight: 20, marginBottom: 5
  }
});

export default connect(state => ({
    state
  }),
  dispatch => ({
    sessionActions: bindActionCreators(sessionActions, dispatch)
  })
)(SignupPage);