export const types = {
  SET_POSTS: "SET_POSTS",
  ADD_POST: "ADD_POST",
}

function setPosts(posts) {
  return {
    type: types.SET_POSTS,
    payload: posts
  }
}

function addPost(postText) {
  return {
    type: types.ADD_POST,
    payload: postText
  }
}

export const postActions = {
  setPosts,
  addPost,
}

export default postActions;