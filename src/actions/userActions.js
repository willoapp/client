import { Alert } from 'react-native'
import firebase from '../utils/firebase'
import willoFetchBlob from '../utils/WilloFetchBlob'

export const types = {
  UPDATE_USER: 'UPDATE_USER',
}

function getUserImage(user) {
  return dispatch => {
    userId = user.uid || user.id
    willoFetchBlob.getImageUri('users', userId)
      .then(imageUri => {
        dispatch({
          type: types.UPDATE_USER,
          payload: { userId, updates: { imageUri } }
        })
      })
  }
}

// Used directly by firebase auth user event handler
function setUserImage(user, imageUri) {
  return dispatch => {
    willoFetchBlob.uploadImage('users', user.id, imageUri)
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