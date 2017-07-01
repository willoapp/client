import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import colors from '../assets/styles/colors'
import spacing from '../assets/styles/spacing'
import fontSizes from '../assets/styles/fontSizes'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import sessionActions from '../actions/sessionActions'
import firebase from '../utils/firebase'

class LoadingPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { state, actions } = this.props
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bggray,
  },
})

// These become the component state.
// This is auto-subscription to the state changes
export default connect(state => ({
  state,
}),
dispatch => ({
  sessionActions: bindActionCreators(sessionActions, dispatch),
})
)(LoadingPage)