import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import PostList from '../../components/PostList'

import colors from '../../assets/styles/colors'
import spacing from '../../assets/styles/spacing'
import fontSizes from '../../assets/styles/fontSizes'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import firebase from '../../utils/firebase'
import postActions from '../../actions/postActions'
import sessionActions from '../../actions/sessionActions'
import userActions from '../../actions/userActions'


class ActivityPage extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.sessionActions.setUser(user)
        this.props.userActions.getUserImage(user)
        this.props.postActions.getPosts()
      } else {
        this.props.navigation.navigate('LoginNavigator')
        this.props.sessionActions.removeUser()
      }
    })
  }

  render() {
    const { state, postActions } = this.props
    return (
      <View style={styles.container}>
        <PostList
          state={state}
          navigation={this.props.navigation}
          postActions={postActions}
        />
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

// These become the component state.
// This is auto-subscription to the state changes
export default connect(state => ({
  state
}),
dispatch => ({
  postActions: bindActionCreators(postActions, dispatch),
  sessionActions: bindActionCreators(sessionActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
})
)(ActivityPage)