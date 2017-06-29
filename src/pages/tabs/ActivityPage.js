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
import postActions from '../../actions/postActions'

class ActivityPage extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.postActions.getPosts()
  }

  render() {
    const { state, actions } = this.props
    return (
      <View style={styles.container}>
        <PostList
          user={state.sessionState.user}
          posts={state.postsState.posts}
          navigation={this.props.navigation}
          {...actions}
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
    postActions: bindActionCreators(postActions, dispatch)
  })
)(ActivityPage)