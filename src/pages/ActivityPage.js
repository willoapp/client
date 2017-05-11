import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import HeaderNav from '../components/HeaderNav';
import PostList from '../components/PostList';
import colors from '../assets/styles/colors';

import {GraphqlService} from '../services/graphql.service'

export default class ActivityPage extends Component {
  graphqlService = null;

  constructor(props) {
    super(props);
    this.graphqlService = new GraphqlService();
    this.state = {posts: []}
  }

  componentDidMount() {
    this.graphqlService.get("{ posts { _id state content createdAt user { username } } }").then(data => {
      const posts = data.posts;
      this.setState({ posts });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderNav/>
        <PostList posts={this.state.posts}/>
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