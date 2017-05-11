import {types} from '../actions/post.actions';

const initialState = {
  posts: []
}

export default reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case types.SET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    default:
      return {
        ...state
      }
  }
}