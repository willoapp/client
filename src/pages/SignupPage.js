import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert
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

class SignupPage extends Component {

  constructor(props) {
    super(props)
    this.state = {firstName: '', lastName: '', email: '', password: ''}
  }

    register(firstName, lastName, email, password) {
      if (!firstName) {
        Alert.alert('Please enter your first name')
      } else if (!lastName) {
        Alert.alert('Please enter a your last name')
      } else {
        this.props.sessionActions.register(firstName, lastName, email, password)
      }
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
                <Icon name="user" style={[styles.icon]} />
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  returnKeyType="next"
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={(firstName) => this.setState({ firstName })}
                  onSubmitEditing={(event) => {
                    this.refs.SecondInput.focus()
                  }}
                />
              </View>

              <View style={[styles.inputWrapper, {borderBottomColor: colors.hairlinegray, borderBottomWidth: StyleSheet.hairlineWidth}]}>
                <Icon name="user" style={[styles.icon, {fontSize: 21.5}]} />
                <TextInput
                  ref='SecondInput'
                  style={[styles.borderTop, styles.input]}
                  placeholder="Last Name"
                  returnKeyType="next"
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={(lastName) => this.setState({ lastName })}
                  onSubmitEditing={(event) => {
                    this.refs.ThirdInput.focus()
                  }}
                  />
              </View>

              <View style={[styles.inputWrapper, {borderBottomColor: colors.hairlinegray, borderBottomWidth: StyleSheet.hairlineWidth}]}>
                <Icon name="envelope" style={[styles.icon, {fontSize: 18}]} />
                <TextInput
                  ref='ThirdInput'
                  style={[styles.borderTop, styles.input]}
                  placeholder="Email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  keyboardType="email-address"
                  onChangeText={(email) => this.setState({ email })}
                  onSubmitEditing={(event) => {
                    this.refs.FourthInput.focus()
                  }}
                  />
              </View>

              <View style={styles.inputWrapper}>
                <Icon name="lock" style={[styles.icon, {fontSize: 25, marginRight: 2}]} />
                <TextInput
                  ref='FourthInput'
                  style={[styles.borderTop, styles.input]}
                  placeholder="Password"
                  secureTextEntry={true}
                  autoCorrect={false}
                  returnKeyType="done"
                  onChangeText={(password) => this.setState({ password })}
                  onSubmitEditing={(event) => {
                    this.register(this.state.firstName, this.state.lastName, this.state.email, this.state.password)
                  }}
                  />
              </View>
            </View>
          </View>

          <TouchableOpacity style={{marginBottom: spacing.small}} onPress={() => this.register(this.state.firstName, this.state.lastName, this.state.email, this.state.password)}>
            <Text style={[styles.loginButton]}>Sign up</Text>
          </TouchableOpacity>

          <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{ marginRight: spacing.xxsmall }}>
              <Text style={{ color: colors.slate, fontSize: fontSizes.normal }}>Already have an account?</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.props.uiActions.setPage('login')}>
                <Text style={{color: colors.white, fontSize: fontSizes.normal}}>Log in</Text>
              </TouchableOpacity>
            </View>
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
    marginTop: spacing.large,
    color: colors.white,
    fontSize: 60,
    fontFamily: 'Sacramento'
  },
  whiteText: {
    color: colors.white
  },
  inputContainer: {
    height: 200,
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
)(SignupPage)