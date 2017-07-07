import {types} from '../actions/postActions'
import merge from 'lodash-es/merge'

export const initialState = {
  posts: {},
  refreshing: false,
  loading: false,
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
  case types.UPDATE_POST:
    return {
      ...state,
      posts: {
        ...state.posts,
        [action.payload.postId]: merge({}, state.posts[action.payload.postId], action.payload.updates)
      }
    }
  case types.SET_LOADING:
    return {
      ...state,
      loading: action.payload
    }

  case types.SET_REFRESHING:
    return {
      ...state,
      refreshing: action.payload
    }
  default:
    return state
  }
}