import sessionService from '../services/sessionService';
import { Alert } from 'react-native';
import uiActions from './uiActions';

export const types = {
  SET_TOKEN: "SET_TOKEN",
  SET_USER: "SET_USER",
  SET_VERIFICATION_EMAIL: "SET_VERIFICATION_EMAIL",
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

function validateVerificationCode(email, verificationCode) {
  return dispatch => {
    sessionService.validateVerificationCode(email, verificationCode).then(data => {
      dispatch(uiActions.setPage('newPassword'))
    }).catch(err => {
      Alert.alert('Invalid', err.message);
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
      Alert.alert('Invalid', err.message)
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
      Alert.alert('Invalid', err.message)
    });
  }
}

function setVerificationEmail(email) {
  return {
    type: types.SET_VERIFICATION_EMAIL,
    payload: email
  }
}

const sessionActions = {
  login,
  logout,
  register,
  setVerificationEmail,
  validateVerificationCode,
};
export default sessionActions;