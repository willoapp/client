import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView, FlatList } from 'react-native';
import PostListItem from './PostListItem';

export default class PostList extends Component {
  constructor(props) {
    super(props);
  }

  _onPressItem(post) {
    console.log(post);
  }

  _keyExtractor = (item, index) => item._id

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.props.posts}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => <PostListItem post={item} onPressItem={this._onPressItem}/>}

        />
      </View>
    );
  }
}
