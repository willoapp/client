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

class ForgotPasswordPage extends Component {

  constructor(props) {
    super(props)
    this.state = {email: ''}
  }

  sendConfirmationEmail(email) {
    // this.props.sessionActions.sendConfirmationEmail(email)
    this.props.sessionActions.setVerificationEmail(email)
    this.props.uiActions.setPage('emailConfirmationCode')
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Text style={styles.logo}>Willow</Text>
          </View>

          <Text style={{color: colors.slate, fontSize: fontSizes.xlarge, marginBottom: spacing.normal}}>Forgot Your Password?</Text>
          <Text style={{color: colors.white, fontSize: fontSizes.normal, marginBottom: spacing.normal, textAlign: 'center'}}>Enter your email address and we will send you a validation code to reset your password.</Text>

          <View style={styles.inputContainer}>
            <View style={styles.innerInputContainer}>
              <View style={[styles.inputWrapper]}>
                <Icon name="envelope" style={[styles.icon, {fontSize: 18}]} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  returnKeyType="done"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(email) => this.setState({ email })}
                  onSubmitEditing={() => this.sendConfirmationEmail(this.state.email)}
                />
              </View>
            </View>
          </View>

          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{marginRight: spacing.xlarge}}>
              <TouchableOpacity onPress={() => this.props.uiActions.setPage('login')}>
                <Text style={styles.loginButton}>Back</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={{marginBottom: spacing.small}} onPress={() => this.sendConfirmationEmail(this.state.email)} disabled={this.state.email.length == 0}>
              <Text style={[styles.loginButton, { color: (this.state.email.length == 0 ? colors.slate : colors.white) }]}>Send</Text>
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
    height: 50,
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
)(ForgotPasswordPage)