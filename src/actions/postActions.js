import firebase from '../utils/firebase'
import {insertIds} from '../utils'
import compact from 'lodash-es/compact'
import isEmpty from 'lodash-es/isEmpty'

export const types = {
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  UPDATE_POST: 'UPDATE_POST',
  SET_LOADING: 'SET_LOADING', // Original load
  SET_REFRESHING: 'SET_REFRESHING', // Pull to refresh
}

function refreshPosts() {
  return dispatch => {
    dispatch({
      type: types.SET_REFRESHING,
      payload: true
    })
    firebase.database().ref('posts').on('value', snapshot => {
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
    firebase.database().ref('posts').on('value', snapshot => {
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
    const newPostRef = firebase.database().ref('posts').push()
    const p = Object.assign({}, post, {createdAt: new Date().toString()})
    newPostRef.set(p).then(_ => {
      dispatch({
        type: types.ADD_POST,
        payload: {[newPostRef.key]: p }
      })
    })
  }
}

function toggleLike(post, user) {
  return (dispatch, getState) => {
    user = getState().sessionState.user
    firebase.database().ref(`posts/${post.id}/likedBy/${user.id}`).set(true)
      .then(_ => {
        dispatch({
          type: types.UPDATE_POST,
          payload: {postId: post.id, updates: {likedBy: {[user.id]: true}}}
        })
      })
      .catch(error => {

      })
  }
}

export const postActions = {
  getPosts,
  addPost,
  toggleLike,
  refreshPosts,
}

export default postActions