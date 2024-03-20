// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import postReducer from './postSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  post:postReducer
});

export default rootReducer;
