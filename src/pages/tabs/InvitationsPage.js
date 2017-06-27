import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native'
import colors from '../../assets/styles/colors'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import postActions from '../../actions/postActions'

class InvitationsPage extends Component {

  constructor(props) {
    super(props)
  }

  onTextChange(text) {
    this.setState({ text })
  }

  render() {
    return (
      <View style={styles.container}>

        <Text>Invitations</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bggray,
  }
})

export default connect(null,
  (dispatch) => ({
    actions: bindActionCreators(postActions, dispatch)
  })
)(InvitationsPage)