import {types} from '../actions/uiActions';

export const initialState = {
  page: 'signup',
}

export default reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case types.SET_PAGE:
      return Object.assign({}, state, {
        page: action.payload
      });
    default:
      return state;
  }
}