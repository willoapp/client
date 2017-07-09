import firebase from '../utils/firebase'
import {insertIds} from '../utils'
import compact from 'lodash-es/compact'
import isEmpty from 'lodash-es/isEmpty'

export const types = {
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  LOVE_POST: 'LOVE_POST',
  UPDATE_POST: 'UPDATE_POST',
  UNLOVE_POST: 'UNLOVE_POST',
  SET_LOADING: 'SET_LOADING', // Original load
  SET_REFRESHING: 'SET_REFRESHING', // Pull to refresh
}

const rootRef = firebase.database()
const postsRef = rootRef.ref('posts')
const postLovesRef = (postId) => postsRef.child(`${postId}/postLoves`)

function refreshPosts() {
  return dispatch => {
    dispatch({
      type: types.SET_REFRESHING,
      payload: true
    })
    // TODO: Where do we clean up this listener?
    postsRef.on('value', snapshot => {
      const posts = insertIds(snapshot.val()) || {}
      dispatch({
        type: types.SET_POSTS,
        payload: posts,
      })
      dispatch({
        type: types.SET_REFRESHING,
        payload: false
      })
    })
  }
}

function getPosts() {
  return (dispatch, getState) => {
    posts = getState().postsState.posts
    if (isEmpty(posts)) {
      dispatch({
        type: types.SET_LOADING,
        payload: true
      })
    }
    // TODO: Where do we clean up this listener?
    postsRef.on('value', snapshot => {
      const posts = insertIds(snapshot.val()) || {}
      dispatch({
        type: types.SET_POSTS,
        payload: posts,
      })
      dispatch({
        type: types.SET_LOADING,
        payload: false
      })
    })
  }
}

function addPost(post) {
  return dispatch => {
    const newPostRef = postsRef.push()
    const p = Object.assign({}, post, {createdAt: new Date().toString(), loveCount: 0})
    newPostRef.set(p).then(_ => {
      dispatch({
        type: types.ADD_POST,
        payload: {[newPostRef.key]: p }
      })
    })
  }
}

function toggleLove(post, user, val) {
  return dispatch => {
    if (val) {
      const newLoveCount = (post.loveCount || 0) + 1
      // Optimistically Update
      dispatch({
        type: types.LOVE_POST,
        payload: { postId: post.id, user }
      })
      dispatch({
        type: types.UPDATE_POST,
        payload: { postId: post.id, updates: { loveCount: newLoveCount } }
      })

      postsRef.child(`${post.id}/loveCount`).set(newLoveCount)
        .catch(error => {
          dispatch({
            type: types.UPDATE_POST,
            payload: { postId: post.id, updates: { loveCount: newLoveCount - 1 } }
          })
        })
      postLovesRef(post.id).child(user.id).set(user)
        .catch(error => {
          dispatch({
            type: types.UNLOVE_POST,
            payload: {postId: post.id, userId: user.id }
          })
          Alert.alert(error)
        })

    } else if (val == false) {
      // Optimistically update
      const newLoveCount = (!post.loveCount || post.loveCount == 0) ? 0 : post.loveCount - 1
      dispatch({
        type: types.UNLOVE_POST,
        payload: {postId: post.id, userId: user.id }
      })
      dispatch({
        type: types.UPDATE_POST,
        payload: { postId: post.id, updates: { loveCount: newLoveCount } }
      })

      postsRef.child(`${post.id}/loveCount`).set(newLoveCount)
        .catch(error => {
          dispatch({
            type: types.UPDATE_POST,
            payload: { postId: post.id, updates: { loveCount: newLoveCount } }
          })
        })
      postLovesRef(post.id).child(user.id).remove() // Removes key/value pair on firebase
    }
  }
}

export const postActions = {
  getPosts,
  addPost,
  toggleLove,
  refreshPosts,
}

export default postActions