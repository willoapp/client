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

class LoginPage extends Component {

  constructor(props) {
    super(props);
  }

  login(email, password) {
    this.props.sessionActions.login(email, password);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            style={styles.fullInput}
            placeholder="Email"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(email) => this.setState({ email })}
            onSubmitEditing={(event) => {
              this.refs.SecondInput.focus();
            }}
          />

          <TextInput
            ref='SecondInput'
            style={styles.fullInput}
            placeholder="Password"
            secureTextEntry={true}
            returnKeyType="done"
            onChangeText={(password) => this.setState({ password })}/>

          <Button
            onPress={() => this.login(this.state.email, this.state.password)}
            title="Login"
          />
          <Button
            onPress={() => this.props.uiActions.setPage('signup')}
            title="Signup instead"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
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
)(LoginPage);