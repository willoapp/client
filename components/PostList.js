import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView, FlatList } from 'react-native';
import {GraphqlService} from '../services/graphql.service'
import PostListItem from './PostListItem';

export default class PostList extends Component {
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

  postList() {
    return this.state.posts.map((p) => <Text key={p._id}>{p.user.username}: {p.content}</Text>)
  }

  _onPressItem(post) {
    console.log(post);
  }

  _keyExtractor = (item, index) => item._id

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.posts}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => <PostListItem post={item} onPressItem={this._onPressItem}/>}

        />
      </View>
    );
  }
}
