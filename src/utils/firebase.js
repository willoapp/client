import * as firebase from 'firebase'

export const databaseURL = 'https://willow-f35f4.firebaseio.com'

firebase.initializeApp({
  apiKey: 'AIzaSyCdRE-iZuUtkMkI6qVn96PlDGfJ-5tBDtI',
  authDomain: 'willow-f35f4.firebaseapp.com',
  databaseURL: databaseURL,
  storageBucket: 'willow-f35f4.appspot.com',
})


export default firebase