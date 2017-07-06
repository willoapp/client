import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import PostListItem from './PostListItem'
import sortBy from 'lodash-es/sortBy'
import colors from '../assets/styles/colors'
import spacing from '../assets/styles/spacing'
import fontSizes from '../assets/styles/fontSizes'
import map from 'lodash-es/map'
import {collectionToArray} from '../utils'
import Avatar from './Avatar'

export default class PostList extends Component {
  constructor(props) {
    super(props)
  }

  _onPressItem(post) {}

  composePost(navigation, user) {
    navigation.navigate('AddActivityPage', { user })
  }

  refreshPosts() {
    this.props.postActions.refreshPosts()
  }

  render() {
    const { postActions, state, navigation } = this.props
    const user = state.sessionState.user
    const { posts, refreshing } = state.postsState

    const data = collectionToArray(posts).reverse()
    data.unshift({id: 1}) // First item is "Create a post"

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          extraData={this.state}
          keyExtractor={item => item.id}
          onRefresh={() => this.refreshPosts()}
          refreshing={refreshing}
          renderItem={({item, index}) => {
            if (index === 0) return (
              <View style={[styles.shareContainer]}>
                <TouchableOpacity style={styles.textInputMock} onPress={() => this.composePost(navigation, user)}>
                  <Avatar size={45} />
                  <Text style={styles.placeholder}>Share something with your family...</Text>
                </TouchableOpacity>
              </View>
            )
            else return <PostListItem user={user} index={index} post={item} postActions={postActions}/>
          }}
          onPressItem={this._onPressItem}
          ItemSeparatorComponent={() => <View style={styles.divider}/>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.gray
  },

  // Create a post
  shareContainer: {
    backgroundColor: colors.white,
    height: 60,
  },
  textInputMock: {
    marginLeft: spacing.small,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  placeholder: {
    marginLeft: spacing.xsmall,
    fontSize: fontSizes.small,
    color: colors.gray,
    fontStyle: 'italic'
  },
})