import sessionService from '../services/sessionService';

export const types = {
  SET_TOKEN: "SET_TOKEN",
  SET_USER: "SET_USER"
}

function logout() {
  return dispatch => {
    dispatch({
      type: types.SET_TOKEN,
      payload: null
    });
    dispatch({
      type: types.SET_USER,
      payload: null
    });
  }
}

function login(email, password) {
  return dispatch => {
    sessionService.login(email, password).then(data => {
      dispatch({
        type: types.SET_TOKEN,
        payload: data.token
      });
      dispatch({
        type: types.SET_USER,
        payload: data.user
      });
    }).catch(err => {
      console.error('error: ', err);
    });
  }
}

function register(firstName, lastName, email, password) {
  return dispatch => {
    sessionService.register(firstName, lastName, email, password).then(data => {
      dispatch({
        type: types.SET_TOKEN,
        payload: data.token
      });
      dispatch({
        type: types.SET_USER,
        payload: data.user
      });
    }).catch(err => {
      console.error('error: ', err);
    });
  }
}

const sessionActions = {
  login,
  logout,
  register
};
export default sessionActions;