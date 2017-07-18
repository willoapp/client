import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'
import * as firebase from 'firebase'

import uiState, { initialState as uiInitialState } from './ui'

const initialState = {
  uiState: uiInitialState
}

const config = {
  apiKey: 'AIzaSyCdRE-iZuUtkMkI6qVn96PlDGfJ-5tBDtI',
  authDomain: 'willow-f35f4.firebaseapp.com',
  databaseURL: 'https://willow-f35f4.firebaseio.com',
  storageBucket: 'willow-f35f4.appspot.com',
}

firebase.initializeApp(config)

const rootReducer = combineReducers({
  uiState: uiState,
  firebase: firebaseStateReducer
})

const reduxConfig = {
  userProfile: 'users',
  enableRedirectHandling: false
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(
    firebase, // pass in firebase instance instead of config so we can extend firebase separately like react-native-firebase for native support
    reduxConfig,
    applyMiddleware(
      // thunk // may not need thunk yet now that we're using firebase directly
      logger
    )
  )
)(createStore)

const store = createStoreWithFirebase(
  rootReducer,
  initialState
)
export default store