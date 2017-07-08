import {types} from '../actions/userActions'
import merge from 'lodash-es/merge'

export const initialState = {
  users: {}
}

export default reducer = (state = initialState, action = {}) => {
  switch(action.type) {

  case types.UPDATE_USER:
    return {
      ...state,
      users: {
        ...state.users,
        [action.payload.userId]: merge({}, state.users[action.payload.userId], action.payload.updates)
      }
    }
  default:
    return state
  }
}