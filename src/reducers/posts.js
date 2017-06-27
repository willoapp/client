import {types} from '../actions/postActions'

export const initialState = {
  posts: {}
}

export default reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case types.SET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case types.ADD_POST:
      return {
        ...state,
        posts: Object.assign({}, state.posts, action.payload)
      }
    default:
      return state
  }
}