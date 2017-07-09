import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import Avatar from '../../components/Avatar'
import get from 'lodash-es/get'

import colors from '../../assets/styles/colors'
import spacing from '../../assets/styles/spacing'
import fontSizes from '../../assets/styles/fontSizes'
import { currentUserWithId, collectionToArrayWithIds } from '../../utils'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase'
import PostListItem from '../../components/PostListItem'

class ActivityPage extends Component {

  constructor(props) {
    super(props)
  }

  composePost(user) {
    this.props.navigation.navigate('AddActivityPage', { user })
  }

  _onPressItem(post) {}

  componentWillMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.navigation.navigate('LoginNavigator')
      } else {
        this.props.firebase.ref('posts').on('value', snapshot => {})
      }
    })
  }

  logout() {
    this.props.firebase.logout()
  }

  toggleLove(post, currentUser, val) {
    if (val) {
      this.props.firebase.ref(`posts/${post.id}`).child('loveCount').set(post.loveCount + 1)
      this.props.firebase.ref(`posts/${post.id}/postLoves`).child(currentUser.id).set(currentUser)
    } else {
      this.props.firebase.ref(`posts/${post.id}`).child('loveCount').set(post.loveCount - 1)
      this.props.firebase.ref(`posts/${post.id}/postLoves`).child(currentUser.id).remove()
    }
  }

  lovedByUser(post, currentUser) {
    if (post && currentUser)
      return Object.keys(post.postLoves).includes(currentUser.id)
  }

  render() {
    const { posts, auth, currentUser } = this.props
    let data = []
    if (posts) {
      data = collectionToArrayWithIds(posts).reverse()
      data.unshift({id: 1})
    }
    return (
      <View style={styles.container}>
        {/*TODO: Add Refreshing back in*/}
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={ item => item.id }
            renderItem={({item, index}) => {
              if (index === 0) return (
                <View style={[styles.shareContainer]}>
                  <TouchableOpacity style={styles.textInputMock} onPress={() => this.composePost(currentUser)}>
                    <Avatar size={45} src={currentUser && currentUser.photoURL}/>
                    <Text style={styles.placeholder}>Share something with your family...</Text>
                  </TouchableOpacity>
                </View>
              )
              else return <PostListItem post={item} lovedByCurrentUser={this.lovedByUser(item, currentUser)} onToggleLove={(val) => this.toggleLove(item, currentUser, val)}/>
            }}
            onPressItem={this._onPressItem}
            ItemSeparatorComponent={() => <View style={styles.divider}/>}
          />
        </View>
        {/*{ loading ?
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Spinner isVisible={loading} size={35} type={'ThreeBounce'} color={colors.gray}/>
          </View>
         : null
        }*/}
      </View>
    )
  }
}

ActivityPage.propTypes = {
  posts: PropTypes.object,
  firebase: PropTypes.object,
  auth: PropTypes.object,
  currentUser: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bggray,
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
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.gray
  },
})

export default compose(
  firebaseConnect([
    'posts', // { path: 'posts' } // object notation
    'users'
  ]),
  connect(
    ({ firebase: { auth, data } }) => {
      return { // state.firebase.data.posts
        posts: data.posts, // Connect props.posts to state.firebase.data.posts
        auth,
        currentUser: currentUserWithId(data.users, auth)
      }
    }
  )
)(ActivityPage)