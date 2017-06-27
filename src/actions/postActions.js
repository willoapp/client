import firebase from '../utils/firebase'

export const types = {
  SET_POSTS: "SET_POSTS",
  ADD_POST: "ADD_POST",
}

function getPosts() {
  return dispatch => {
    firebase.database().ref('posts').on('value', snapshot => {
      const posts = snapshot.val() || {}
      dispatch({
        type: types.SET_POSTS,
        payload: posts
      })
    })
  }
}

function addPost(post) {
  return dispatch => {
    const newPostRef = firebase.database().ref('posts').push()
    p = Object.assign({}, post, {createdAt: new Date().toString()})
    newPostRef.set(p).then(_ => {
      dispatch({
        type: types.ADD_POST,
        payload: {[newPostRef.key]: p}
      })
    })
  }
}

export const postActions = {
  getPosts,
  addPost,
}

export default postActions