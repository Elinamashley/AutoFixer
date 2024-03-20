import { configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from '../redux/rootReducer'; // Update the path
import {thunk} from 'redux-thunk'; // Import the thunk function directly



const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false, 
    });

    return middleware.concat(logger, thunk);
  },
});

// Initialize current state from the Redux store for subscription comparison


export default store;
