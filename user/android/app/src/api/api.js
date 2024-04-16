// src/api.js
import axios from 'axios';
import store from '../component/redux/store';
import { loadUser } from './actions/authAction';
import { logoutAsync } from '../component/redux/authSlice';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8080/api/v1', // Remove the extra '/' at the beginning
  headers: {
    'Content-Type': 'application/json'
  }
});

/*
  NOTE: intercept any error responses from the api
  and check if the token is no longer valid.
  ie. Token has expired or user is no longer
  authenticated.
  logout the user if the token has expired
*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
       store.dispatch(logoutAsync());
    }
    return Promise.reject(err);
  }
);

let currentState = store.getState();

store.subscribe(() => {
  const previousState = currentState;
  currentState = store.getState();

  const previousToken = previousState.auth?.token;
  const currentToken = currentState.auth?.token;

  if (previousToken !== currentToken) {
    // Set the token and fetch user data when the token changes
    store.dispatch(loadUser());
  }
});

export default api;
