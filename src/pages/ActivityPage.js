import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import HeaderNav from '../components/HeaderNav';
import PostList from '../components/PostList';
import colors from '../assets/styles/colors';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import postActions from '../actions/post.actions';

class ActivityPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getPosts();
  }

  render() {
    const { state, actions } = this.props;
    return (
      <View style={styles.container}>
        <HeaderNav/>
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
export default connect(state => ({
    state
  }),
  dispatch => ({
    actions: bindActionCreators(postActions, dispatch)
  })
)(ActivityPage);