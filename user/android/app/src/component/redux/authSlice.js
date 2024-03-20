import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define an async thunk for the logout operation
export const logoutAsync = createAsyncThunk('auth/logoutAsync', async () => {
  try {
    await AsyncStorage.removeItem('token');
    return null; // Return null or any data you want after successful logout
  } catch (error) {
    console.error('Error removing token from AsyncStorage:', error);
    throw error; // Propagate the error
  }
});

const authInitialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetAuth: (state) => {
      state.loading = false;
      state.error = null;
    },
    resetAuthState: (state) => {
      return { ...authInitialState };
    },
  },
  extraReducers: (builder) => {
    // Handle the logoutAsync fulfilled action
    builder.addCase(logoutAsync.fulfilled, (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});

export const {
  setToken,
  setLoading,
  setError,
  setUser,
  resetAuth,
  resetAuthState,
} = authSlice.actions;


export default authSlice.reducer;
