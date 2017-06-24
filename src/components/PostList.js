import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  FlatList,
  StyleSheet,
} from 'react-native';
import PostListItem from './PostListItem';
import sortBy from 'lodash-es/sortBy';
import colors from '../assets/styles/colors';
import spacing from '../assets/styles/spacing';

export default class PostList extends Component {
  constructor(props) {
    super(props);
  }

  _onPressItem(post) {
    console.log(post);
  }

  _keyExtractor = (item, index) => item._id

  orderedPosts(posts) {
    return sortBy(posts, p => p.createdAt).reverse();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.orderedPosts(this.props.posts)}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={({item, index}) => <PostListItem index={index} post={item}/>}
          onPressItem={this._onPressItem}
          ItemSeparatorComponent={() => <View style={styles.divider}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    height: spacing.backgroundWidth,
    backgroundColor: colors.bggray
  }
})