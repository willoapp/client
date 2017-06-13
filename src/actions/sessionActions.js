import sessionService from '../services/sessionService';

export const types = {
  SET_TOKEN: "SET_TOKEN",
  SET_USER: "SET_USER"
}

function login(username, password) {
  return dispatch => {
    sessionService.login(username, password).then(data => {
      dispatch({
        type: types.SET_TOKEN,
        payload: data.token
      });
      dispatch({
        type: types.SET_USER,
        payload: data.user
      });
    });
  }
}

function register(firstName, lastName, username, password) {
  return dispatchEvent => {
    sessionService.register(firstName, lastName, username, password).then(data => {
      dispatch({
        type: types.SET_TOKEN,
        payload: data.token
      });
      dispatch({
        type: types.SET_USER,
        payload: data.user
      });
    });
  }
}

const sessionActions = {
  login,
  register
};
export default sessionActions;