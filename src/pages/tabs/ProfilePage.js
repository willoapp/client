import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Button,
} from 'react-native'
import ProfileHeader from '../../components/ProfileHeader'

import colors from '../../assets/styles/colors'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import sessionActions from '../../actions/sessionActions'
import uiActions from '../../actions/uiActions'
import userActions from '../../actions/userActions'

class ProfilePage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.userActions.getUserImage(this.props.state.sessionState.user)
  }

  logout() {
    this.props.sessionActions.logout()
    this.props.uiActions.setPage('signup')
  }

  onEditPress() {
    console.log('Edit was pressed')
  }

  render() {
    const { state, sessionActions, userActions } = this.props
    const { user } = state.sessionState
    const userWithImageUri = state.usersState.users[user.id]
    const userWithImage = Object.assign({}, user, userWithImageUri)

    return (
      <View style={styles.container}>
        <ProfileHeader user={userWithImage} userActions={userActions} onEditPress={() => this.onEditPress()}/>
        <Button
          onPress={() => this.logout()}
          title="Log out"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  }
})

export default connect(state => ({
  state,
}),
dispatch => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  sessionActions: bindActionCreators(sessionActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
})
)(ProfilePage)