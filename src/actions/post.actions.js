import graphqlService from '../services/graphql.service'

export const types = {
  SET_POSTS: "SET_POSTS",
  ADD_POST: "ADD_POST",
}

function getPosts() {
  return (dispatch) => {
    graphqlService.query("{ posts { _id state content createdAt user { username } } }").then(data => {
      dispatch({
        type: types.SET_POSTS,
        payload: data.posts
      });
    });
  }
}

function addPost(postText) {
  return {
    type: types.ADD_POST,
    payload: postText
  }
}

export const postActions = {
  getPosts,
  addPost,
}

export default postActions;