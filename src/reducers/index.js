import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'

import sessionState, { initialState as sessionInitialState } from './session'
import postsState, { initialState as postsInitialState } from './posts'
import uiState, { initialState as uiInitialState } from './ui'
// import users from './users'

const initialState = {
  uiState: uiInitialState,
  sessionState: sessionInitialState,
  postsState: postsInitialState,
}

const reducers = {
  uiState,
  sessionState,
  postsState,
}

let reducer = combineReducers(reducers)
let store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(
      thunk,
      logger // TODO: Only use in development
    )
  )
)

export default store