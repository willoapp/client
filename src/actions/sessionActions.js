import { Alert } from 'react-native'
import uiActions from './uiActions'
import firebase from '../utils/firebase'

export const types = {
  SET_TOKEN: 'SET_TOKEN',
  SET_USER: 'SET_USER',
  SET_LOGIN_LOADING: 'SET_LOGIN_LOADING',
}

console.log('firebase: ', firebase)
const rootRef = firebase.database()
const usersRef = rootRef.ref('users')
const userLovesRef = rootRef.ref('userLoves')

// Used directly by firebase auth user event handler
function setUser(authUser) {
  return dispatch => {
    usersRef.child(authUser.uid).once('value').then(user => {
      u = Object.assign({}, user.val(), {id: authUser.uid})
      dispatch({
        type: types.SET_USER,
        payload: u,
      })
    })
  }
}

// Used directly by firebase auth user event handler
function removeUser() {
  return dispatch => {
    dispatch({
      type: types.SET_USER,
      payload: null,
    })
  }
}

function login(email, password, successCallback = null) {
  return dispatch => {
    dispatch({
      type: types.SET_LOGIN_LOADING,
      payload: true,
    })
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(data => {
        firebase.database().ref(`users/${data.uid}`).once('value').then(user => {
          if (successCallback) successCallback()
          u = Object.assign({}, user.val(), {id: data.uid})
          dispatch({
            type: types.SET_USER,
            payload: u,
          })
          dispatch({
            type: types.SET_LOGIN_LOADING,
            payload: false,
          })
        })
      })
      .catch(error => {
        dispatch({
          type: types.SET_LOGIN_LOADING,
          payload: false,
        })
        Alert.alert(error.toString())
      })
  }
}

function logout() {
  return dispatch => {
    firebase.auth().signOut().then(() => {
      dispatch({
        type: types.SET_USER,
        payload: null,
      })
    }).catch(error => {
      Alert.alert(error.toString())
    })
  }
}

function register(firstName, lastName, email, password, successCallback = null) {
  return dispatch => {
    dispatch({
      type: types.SET_LOGIN_LOADING,
      payload: true,
    })
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(data => {
        if (successCallback) successCallback()
        firebase.database().ref('users/' + data.uid).set({
          email,
          firstName,
          lastName,
          createdAt: new Date().toString()
        })
        user = { email: data.email, uid: data.uid, firstName, lastName }
        dispatch({
          type: types.SET_USER,
          payload: user
        })
        dispatch({
          type: types.SET_LOGIN_LOADING,
          payload: false
        })
      })
      .catch(error => {
        dispatch({
          type: types.SET_LOGIN_LOADING,
          payload: false
        })
        Alert.alert(error.toString())
      })
  }
}

const sessionActions = {
  setUser,
  removeUser,
  login,
  logout,
  register,
}
export default sessionActions