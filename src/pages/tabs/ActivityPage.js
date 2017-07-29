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

import Spinner from 'react-native-spinkit'
import postActions from '../../actions/postActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase'
import PostListItem from '../../components/PostListItem'
import TitleText from '../../components/TitleText'

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
      }
    })
  }

  toggleLove(post, currentUser, val) {
    if (val) {
      postActions.lovePost(this.props.firebase, post, currentUser)
    } else {
      postActions.unlovePost(this.props.firebase, post, currentUser)
    }
  }

  lovedByUser(post, currentUser) {
    if (currentUser && post && post.postLoves)
      return Object.keys(post.postLoves).includes(currentUser.id)
  }

  render() {
    const { posts, currentUser, uiState, uiActions } = this.props
    const loaded = isLoaded(posts)
    const empty = isEmpty(posts)
    let data = []
    if (posts) {
      data = collectionToArrayWithIds(posts).reverse()
      data.unshift({id: 1}, {id: 2})
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
              keyExtractor={ item => item.id }
              renderItem={({item, index}) => {
                if (index == 0) return (
                  <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: colors.white }}>
                    <TitleText>NEWSFEED</TitleText>
                  </View>
                )
                else if (index === 1) return (
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
        }
      </View>
    )
  }
}

ActivityPage.propTypes = {
  posts: PropTypes.object,
  firebase: PropTypes.object,
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
    ({ firebase: { auth, data }, uiState }) => ({
      posts: data.posts, // Connect props.posts to state.firebase.data.posts
      currentUser: currentUserWithId(data.users, auth),
      uiState
    })
  )
)(ActivityPage)