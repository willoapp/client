import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import HeaderNav from '../components/HeaderNav';
import PostList from '../components/PostList';
import colors from '../assets/styles/colors';

import { GraphqlService } from '../services/graphql.service'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import postActions from '../actions/post.actions';

class ActivityPage extends Component {
  graphqlService = null;

  constructor(props) {
    super(props);
    this.graphqlService = new GraphqlService();
  }

  componentDidMount() {
    this.graphqlService.get("{ posts { _id state content createdAt user { username } } }").then(data => {
      const posts = data.posts;
      this.props.actions.setPosts(posts);
    });
  }

  render() {
    const { state, actions } = this.props;
    return (
      <View style={styles.container}>
        <HeaderNav/>
        <PostList posts={state.posts} {...actions}/>
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

export default connect(state => ({
    state: state.posts
  }),
  (dispatch) => ({
    actions: bindActionCreators(postActions, dispatch)
  })
)(ActivityPage);