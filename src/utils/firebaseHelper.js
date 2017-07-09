import willoFetchBlob from './willoFetchBlob'

class FirebaseHelper {
  uploadImage(firebase, directory, id, imagePath) {
    return new Promise((resolve, reject) => {
      willoFetchBlob.uploadImage(firebase, directory, id, imagePath).then(() => {
        willoFetchBlob.getPhotoURL(firebase, directory, id).then(photoURL => {
          resolve(photoURL)
        }).catch(error => {
          reject(error)
        })
      }).catch(error => {
        reject(error)
      })
    })
  }

  updateUser(firebase, userId, updates) {
    firebase.ref('users').child(userId).update(updates)
    // TODO: Update post's users and postLoves users as well
  }
}

const firebaseHelper = new FirebaseHelper()
export default firebaseHelper