import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import colors from '../assets/styles/colors';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sessionActions from '../actions/sessionActions';
import uiActions from '../actions/uiActions';

class SignupPage extends Component {

  constructor(props) {
    super(props);
  }

  register(firstName, lastName, email, password) {
    this.props.sessionActions.register(firstName, lastName, email, password);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            style={styles.fullInput}
            placeholder="First name"
            returnKeyType="next"
            onChangeText={(firstName) => this.setState({ firstName })}
            onSubmitEditing={(event) => {
              this.refs.SecondInput.focus();
            }}
          />

          <TextInput
            ref="SecondInput"
            style={styles.fullInput}
            placeholder="Last name"
            returnKeyType="next"
            onChangeText={(lastName) => this.setState({ lastName })}
            onSubmitEditing={(event) => {
              this.refs.ThirdInput.focus();
            }}
          />

          <TextInput
            ref="ThirdInput"
            style={styles.fullInput}
            placeholder="Email"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(email) => this.setState({ email })}
            onSubmitEditing={(event) => {
              this.refs.FourthInput.focus();
            }}
          />

          <TextInput
            ref="FourthInput"
            style={styles.fullInput}
            placeholder="Password"
            returnKeyType="done"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}/>

          <Button
            onPress={() => this.register(this.state.firstName, this.state.lastName, this.state.email, this.state.password)}
            title="Sign Up"
          />
          <Button
            onPress={() => this.props.uiActions.setPage('login')}
            title="Login instead"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: StyleSheet.hairlineWidth,
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
    uiActions: bindActionCreators(uiActions, dispatch),
    sessionActions: bindActionCreators(sessionActions, dispatch)
  })
)(SignupPage);