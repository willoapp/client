import {types} from '../actions/sessionActions'

export const initialState = {
  userLoaded: false,
  user: null,
  token: null,
  verificationEmail: null
}

export default reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case types.SET_TOKEN:
      return Object.assign({}, state, {
        token: action.payload
      })
    case types.SET_USER:
      return Object.assign({}, state, {
        user: action.payload,
        userLoaded: true,
      })
    default:
      return state
  }
}