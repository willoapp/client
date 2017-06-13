import graphqlService from '../services/graphqlService'

export const types = {
  SET_POSTS: "SET_POSTS",
  ADD_POST: "ADD_POST",
}

const postFragment = '{ _id state content createdAt user { firstName lastName } }';

function getPosts() {
  return (dispatch, getState) => {
    graphqlService.query(getState(), `{ posts ${postFragment} }`).then(data => {
      dispatch({
        type: types.SET_POSTS,
        payload: data.posts
      });
    });
  }
}

function addPost(postText) {
  return (dispatch, getState) => {
    graphqlService.mutate(getState(), `mutation ($post: PostInput!) { addPost(post: $post) ${postFragment} }`, { post }).then(data => {
      const post = data.addPost;
      dispatch({
        type: types.ADD_POST,
        payload: post
      })
      this.props.actions.addPost(post);
    });
  }
}

export const postActions = {
  getPosts,
  addPost,
}

export default postActions;