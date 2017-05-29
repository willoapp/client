import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

// import users from './users';
import postsState from './posts';

const state = {
  // users,
  postsState,
};

const store = createStore(combineReducers(state));

export default store;