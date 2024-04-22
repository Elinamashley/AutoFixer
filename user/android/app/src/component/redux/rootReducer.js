// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import postReducer from './postSlice';
import requestReducer from './requestSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  post:postReducer,
  serviceRequest:requestReducer,
});

export default rootReducer;
