import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView } from 'react-native';
import {GraphqlService} from '../services/graphql.service'

export default class PostList extends Component {
  graphqlService = null;

  constructor(props) {
    super(props);
    this.graphqlService = new GraphqlService();
    this.state = {posts: []}
  }

  componentDidMount() {
    this.graphqlService.get("{ posts { _id content user { username } } }").then(data => {
      const posts = data.posts;
      this.setState({ posts });
    });
  }

  postList() {
    return this.state.posts.map((p) => <Text key={p._id}>{p.user.username}: {p.content}</Text>)
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        {this.postList()}
      </View>
    );
  }
}
