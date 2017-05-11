export const types = {
  SET_POSTS: "SET_POSTS"
}

function setPosts(posts) {
  return {
    type: types.SET_POSTS,
    payload: posts
  }
}

export const postActions = {
  setPosts
}

export default postActions;