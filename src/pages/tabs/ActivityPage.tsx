import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import Avatar from '../../components/Avatar'

import colors from '../../assets/styles/colors'
import spacing from '../../assets/styles/spacing'
import fontSizes from '../../assets/styles/fontSizes'
import { currentUserWithId, collectionToArrayWithIds } from '../../utils'

import Spinner from 'react-native-spinkit'
import postActions from '../../actions/postActions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  firebaseConnect,
  isLoaded,
  // isEmpty,
} from 'react-redux-firebase'
import PostListItem from '../../components/PostListItem'

import {
  Post,
  User,
} from '../../types'

interface IActivityPageProps {
  navigation: any,
  firebase: any,
  posts: Post[],
  currentUser: User
}

class ActivityPage extends Component<IActivityPageProps> {

  constructor(props) {
    super(props)
  }

  composePost(user: User): void {
    const { navigation } = this.props
    navigation.navigate('AddActivityPage', { user })
  }

  // _onPressItem(post: Post) {}

  componentWillMount(): void {
    const { firebase, navigation } = this.props
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        navigation.navigate('LoginNavigator')
      }
    })
  }

  toggleLove(post: Post, currentUser: User, val: boolean): void {
    if (val) {
      postActions.lovePost(this.props.firebase, post, currentUser)
    } else {
      postActions.unlovePost(this.props.firebase, post, currentUser)
    }
  }

  lovedByUser(post: Post, currentUser: User): boolean {
    if (currentUser && post && post.postLoves)
      return Object.keys(post.postLoves).includes(currentUser.id)
    return false
  }

  render() {
    const { posts, currentUser } = this.props
    const loaded = isLoaded(posts)
    // const empty = isEmpty(posts)
    let data = []
    if (posts) {
      data = collectionToArrayWithIds(posts).reverse()
      data.unshift({id: 1})
    }
    return (
      <View style={{flex: 1}}>
        {/*TODO: Add Refreshing back in*/}
        { !loaded ?
          <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
            <Spinner isVisible={!loaded} size={35} type={'ThreeBounce'} color={colors.gray}/>
          </View>
          :
          <View style={styles.container}>
            <FlatList
              data={data}
              ItemSeparatorComponent={() => <View style={styles.divider}/>}
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
            />
          </View>
        }
      </View>
    )
  }
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
    ({ firebase: { auth, data } }) => ({
      posts: data.posts, // Connect props.posts to state.firebase.data.posts
      currentUser: currentUserWithId(data.users, auth),
    })
  )
)(ActivityPage as any)