import { Alert } from 'react-native'
import uiActions from './uiActions'
import firebase from '../utils/firebase'

export const types = {
  SET_TOKEN: "SET_TOKEN",
  SET_USER: "SET_USER",
}

function login(email, password) {
  return dispatch => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => {
      firebase.database().ref(`users/${data.uid}`).once('value').then(user => {
        u = Object.assign({}, user.val(), {id: data.uid})
        dispatch({
          type: types.SET_USER,
          payload: u
        })
      })
    })
    .catch(error => {
      Alert.alert(error.toString())
    })
  }
}

function logout() {
  return dispatch => {
    firebase.auth().signOut().then(() => {
      dispatch({
        type: types.SET_USER,
        payload: null
      })
    }).catch(error => {
      Alert.alert(error.toString())
    })
  }
}

function register(firstName, lastName, email, password) {
  return dispatch => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(data => {
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
    })
    .catch(error => {
      Alert.alert(error.toString())
    })
  }
}

const sessionActions = {
  login,
  logout,
  register
}
export default sessionActions