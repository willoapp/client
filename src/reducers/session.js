import {types} from '../actions/sessionActions';

const sessionState = {
  user: null,
  token: null
}

export default reducer = (state = sessionState, action = {}) => {
  switch(action.type) {
    case types.SET_TOKEN:
      return Object.assign({}, state, {
        token: action.payload
      });
    case types.SET_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    default:
      return {
        ...state
      }
  }
}