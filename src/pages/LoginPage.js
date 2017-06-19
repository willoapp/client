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
import Icon from 'react-native-vector-icons/FontAwesome';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sessionActions from '../actions/sessionActions';
import uiActions from '../actions/uiActions';

let {height, width} = Dimensions.get('window');

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
              <View style={[styles.inputWrapper, {borderBottomColor: colors.gray, borderBottomWidth: StyleSheet.hairlineWidth}]}>
                <Icon name="envelope" style={[styles.icon, {fontSize: 18}]} />
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
              </View>

              <View style={styles.inputWrapper}>
                <Icon name="lock" style={[styles.icon, {marginRight: 5}]} />
                <TextInput
                  ref='SecondInput'
                  style={[styles.borderTop, styles.input]}
                  placeholder="Password"
                  secureTextEntry={true}
                  returnKeyType="done"
                  onChangeText={(password) => this.setState({ password })}/>
              </View>
            </View>
          </View>

          <View style={{marginBottom: spacing.normal}}>
            <Button
              color={colors.white}
              onPress={() => this.login(this.state.email, this.state.password)}
              title="Login"
            />
          </View>
          <Button
            color={colors.white}
            onPress={() => this.props.uiActions.setPage('signup')}
            title="New to Willow? Sign up"
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
    marginTop: spacing.xlarge,
    color: colors.white,
    fontSize: 60,
    fontFamily: 'Sacramento'
  },
  whiteText: {
    color: colors.white
  },
  inputContainer: {
    height: 100,
    width: width - (spacing.normal*2),
    marginBottom: spacing.normal,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray,
    borderRadius: 20,
  },
  innerInputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  inputWrapper: {
    marginLeft: spacing.normal,
    marginRight: spacing.normal,
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: spacing.xlarge,
    marginLeft: spacing.xsmall,
    alignSelf: 'center'
  },
  icon: {
    fontSize: 20,
    alignSelf: 'center',
    // Padding to alleviate buggy side clipping
    paddingRight: spacing.xxsmall,
    paddingLeft: spacing.xxsmall,
    color: colors.gray
  },
});

export default connect(state => ({
    state
  }),
  dispatch => ({
    uiActions: bindActionCreators(uiActions, dispatch),
    sessionActions: bindActionCreators(sessionActions, dispatch)
  })
)(LoginPage);