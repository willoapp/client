import * as firebase from 'firebase'
import sessionActions from '../actions/sessionActions'

firebase.initializeApp({
  apiKey: 'AIzaSyCdRE-iZuUtkMkI6qVn96PlDGfJ-5tBDtI',
  authDomain: 'willow-f35f4.firebaseapp.com',
  databaseURL: 'https://willow-f35f4.firebaseio.com',
  storageBucket: 'willow-f35f4.appspot.com',
})


export default firebase