import { Alert } from 'react-native'
import firebase from '../utils/firebase'
import willoFetchBlob from '../utils/WilloFetchBlob'

export const types = {
  UPDATE_USER: 'UPDATE_USER',
}

function getUserImage(user) {
  return dispatch => {
    userId = user.uid || user.id
    willoFetchBlob.getPhotoURL('users', userId)
      .then(photoURL => {
        dispatch({
          type: types.UPDATE_USER,
          payload: { userId, updates: { photoURL } }
        })
      })
  }
}

// Used directly by firebase auth user event handler
function setUserImage(user, photoURL) {
  return dispatch => {
    willoFetchBlob.uploadImage('users', user.id, photoURL)
      .then(_ => {
        dispatch(getUserImage(user))
      })
      .catch(error => {
        Alert.alert(error)
      })
  }
}

const userActions = {
  setUserImage,
  getUserImage,
}
export default userActions