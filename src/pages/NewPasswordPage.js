import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import colors from '../assets/styles/colors';
import spacing from '../assets/styles/spacing';
import fontSizes from '../assets/styles/fontSizes';
import Icon from 'react-native-vector-icons/FontAwesome';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sessionActions from '../actions/sessionActions';
import uiActions from '../actions/uiActions';

let {height, width} = Dimensions.get('window');

class NewPasswordPage extends Component {

  constructor(props) {
    super(props);
    this.state = {newPassword: '', newPasswordConfirmation: ''}
  }

  updatePassword(newPassword, newPasswordConfirmation) {
    if (!this.passwordsMatch()) {
      Alert.alert("Passwords don't match", "Make sure your password matches in both fields.")
    } else {
      this.props.sessionActions.updatePassword(newPassword);
    }
  }

  passwordsMatch() {
    return this.state.newPassword === this.state.newPasswordConfirmation;
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
                <Icon name="lock" style={[styles.icon, {fontSize: 25, marginRight: 2}]} />
                <TextInput
                  style={[styles.borderTop, styles.input]}
                  placeholder="New Password"
                  returnKeyType="next"
                  autoCorrect={false}
                  secureTextEntry={true}
                  returnKeyType="done"
                  onChangeText={(newPassword) => this.setState({ newPassword })}
                  onSubmitEditing={(event) => {
                    this.refs.SecondInput.focus();
                  }}
                  />
              </View>
              <View style={styles.inputWrapper}>
                <Icon name="lock" style={[styles.icon, {fontSize: 25, marginRight: 2}]} />
                <TextInput
                  ref='SecondInput'
                  style={[styles.borderTop, styles.input]}
                  placeholder="Confirm New Password"
                  autoCorrect={false}
                  secureTextEntry={true}
                  returnKeyType="done"
                  onChangeText={(password) => this.setState({ password })}
                  onSubmitEditing={() => this.updatePassword(this.state.newPassword, this.state.confirmNewPassword)}
                  />
              </View>
            </View>
          </View>

          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{marginRight: spacing.xlarge}}>
              <TouchableOpacity style={{marginBottom: spacing.small}} onPress={() => this.uiActions.setPage('login')}>
                <Text style={styles.loginButton}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={{marginBottom: spacing.small}} disabled={!this.passwordsMatch()} onPress={() => this.updatePassword(this.state.newPassword, this.state.confirmNewPassword)}>
              <Text style={[styles.loginButton, {color: this.passwordsMatch() ? colors.white : colors.slate}]}>Confirm</Text>
            </TouchableOpacity>
          </View>
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
});

export default connect(state => ({
    state
  }),
  dispatch => ({
    uiActions: bindActionCreators(uiActions, dispatch),
    sessionActions: bindActionCreators(sessionActions, dispatch)
  })
)(NewPasswordPage);