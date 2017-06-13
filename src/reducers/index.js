import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

// import users from './users';
import postsState from './posts';
import sessionState from './session';

const state = {
  sessionState,
  postsState,
};

let reducer = combineReducers(state);
let store = createStore(reducer, applyMiddleware(thunk));

export default store;