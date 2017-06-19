import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Dimensions
} from 'react-native';
import colors from '../assets/styles/colors';
import spacing from '../assets/styles/spacing';

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
          <Text style={styles.logo}>Willow</Text>

          <View style={styles.inputContainer}>
            <View style={styles.innerInputContainer}>
              <TextInput
                style={styles.input}
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
                style={[styles.borderTop, styles.input]}
                placeholder="Password"
                secureTextEntry={true}
                returnKeyType="done"
                onChangeText={(password) => this.setState({ password })}/>
            </View>
          </View>

          <Button
            color={colors.white}
            onPress={() => this.login(this.state.email, this.state.password)}
            title="Login"
          />
          <Button
            color={colors.white}
            onPress={() => this.props.uiActions.setPage('signup')}
            title="New to Willow? Sign up!"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.seaside,
  },
  logo: {
    marginTop: spacing.normal,
    color: colors.white,
    fontSize: 70,
    fontFamily: 'Sacramento'
  },
  whiteText: {
    color: colors.white
  },
  inputContainer: {
    height: 100,
    alignSelf: 'stretch',
    marginLeft: spacing.normal,
    marginRight: spacing.normal,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray,
    borderRadius: 20,
  },
  innerInputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    backgroundColor: colors.white,
    paddingLeft: spacing.small,
    paddingRight: spacing.xsmall,
    marginLeft: spacing.normal,
    marginRight: spacing.normal,
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