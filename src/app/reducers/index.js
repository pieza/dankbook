import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import errorReducer from './error.reducer';
// import profileReducer from './profile.reducer';
// import postReducer from './postReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
  // profile: profileReducer,
  // post: postReducer
});