import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { RootModalNavigator, LoadingNavigator } from './router'
import LoadingPage from './pages/LoadingPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import EmailConfirmationCodePage from './pages/EmailConfirmationCodePage'
import NewPasswordPage from './pages/NewPasswordPage'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import sessionActions from './actions/sessionActions'
import uiActions from './actions/uiActions'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <RootModalNavigator/>
      </View>
    )
    // else if (this.props.state.uiState.page === 'login') {
    //   return (
    //     <View style={styles.container}>
    //       <LoginPage/>
    //     </View>
    //   )
    // } else if (this.props.state.uiState.page === 'forgotPassword') {
    //   return (
    //     <View style={styles.container}>
    //       <ForgotPasswordPage/>
    //     </View>
    //   )
    // } else if (this.props.state.uiState.page === 'emailConfirmationCode') {
    //   return (
    //     <View style={styles.container}>
    //       <EmailConfirmationCodePage/>
    //     </View>
    //   )
    // } else if (this.props.state.uiState.page === 'newPassword') {
    //   return (
    //     <View style={styles.container}>
    //       <NewPasswordPage/>
    //     </View>
    //   )
    // } else {
    //   return (
    //     <View style={styles.container}>
    //       <SignupPage/>
    //     </View>
    //   )
    // }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default connect(state => ({
    state
  }),
  dispatch => ({
    sessionActions: bindActionCreators(sessionActions, dispatch),
    uiActions: bindActionCreators(uiActions, dispatch)
  })
)(App)