import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import HeaderNav from '../components/HeaderNav';
import PostList from '../components/PostList';
import AddActivity from '../components/AddActivity';

import colors from '../assets/styles/colors';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import postActions from '../actions/postActions';

class ActivityPage extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.actions.getPosts();
  }

  addPost() {
    const post = { content: this.state.text, userId: "58d9eafafa8beec1b2c33cbb" }
    this.props.actions.addPost(post);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <View style={styles.container}>
        <HeaderNav/>
        <AddActivity/>
        <PostList posts={state.postsState.posts} {...actions}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bglightgray,
  }
});

// These become the component state.
// This is auto-subscription to the state changes
export default connect(state => ({
    state
  }),
  dispatch => ({
    actions: bindActionCreators(postActions, dispatch)
  })
)(ActivityPage);