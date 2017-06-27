import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import colors from '../assets/styles/colors'
import spacing from '../assets/styles/spacing'
import fontSizes from '../assets/styles/fontSizes'
import Icon from 'react-native-vector-icons/FontAwesome'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import sessionActions from '../actions/sessionActions'
import uiActions from '../actions/uiActions'

let {height, width} = Dimensions.get('window')

class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {email: '', password: ''}
  }

  login(email, password) {
    this.props.sessionActions.login(email, password)
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Text style={styles.logo}>Willow</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.innerInputContainer}>
              <View style={[styles.inputWrapper, {borderBottomColor: colors.hairlinegray, borderBottomWidth: StyleSheet.hairlineWidth}]}>
                <Icon name="envelope" style={[styles.icon, {fontSize: 18}]} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  returnKeyType="next"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(email) => this.setState({ email })}
                  onSubmitEditing={(event) => {
                    this.refs.SecondInput.focus()
                  }}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Icon name="lock" style={[styles.icon, {fontSize: 25, marginRight: 2}]} />
                <TextInput
                  ref='SecondInput'
                  style={[styles.borderTop, styles.input]}
                  placeholder="Password"
                  autoCorrect={false}
                  secureTextEntry={true}
                  returnKeyType="done"
                  onChangeText={(password) => this.setState({ password })}/>
              </View>
            </View>
          </View>

          <TouchableOpacity style={{marginBottom: spacing.small}} onPress={() => this.login(this.state.email, this.state.password)}>
            <Text style={[styles.loginButton, this.props.state.sessionState.loginLoading ? { color: colors.gray } : {}]}>
              {this.props.state.sessionState.loginLoading ? 'Loggin you in...' : 'Log in'}
            </Text>
          </TouchableOpacity>

          <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{ marginRight: spacing.xxsmall }}>
              <Text style={{ color: colors.slate, fontSize: fontSizes.normal }}>New to Willow?</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.props.uiActions.setPage('signup')}>
                <Text style={{color: colors.white, fontSize: fontSizes.normal }}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: spacing.xsmall, flex: 0, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.props.uiActions.setPage('forgotPassword')}>
              <Text style={{color: colors.white, fontSize: fontSizes.normal }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
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
    marginBottom: spacing.small,
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
    fontSize: fontSizes.xxlarge,
    alignSelf: 'center',
    // Padding to alleviate buggy side clipping
    paddingRight: spacing.xxsmall,
    paddingLeft: spacing.xxsmall,
    color: colors.gray
  },
  loginButton: {
    color: colors.white,
    fontSize: fontSizes.xlarge,
  }
})

export default connect(state => ({
    state
  }),
  dispatch => ({
    uiActions: bindActionCreators(uiActions, dispatch),
    sessionActions: bindActionCreators(sessionActions, dispatch)
  })
)(LoginPage)