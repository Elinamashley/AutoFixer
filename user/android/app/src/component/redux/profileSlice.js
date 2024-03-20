import { createSlice } from '@reduxjs/toolkit';

const profileInitialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: profileInitialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    deleteAccount: (state) => {
      // Handle delete account logic
      state.profile = null;
      state.loading = false;
    },
    getProfile: (state, action) => {
      // Handle get profile logic
      state.profile = action.payload;
      state.loading = false;
    },
    getProfiles: (state, action) => {
      // Handle get profiles logic
      state.profiles = action.payload;
      state.loading = false;
    },
    getRepos: (state, action) => {
      // Handle get repos logic
      state.repos = action.payload;
      state.loading = false;
    },
    profileError: (state, action) => {
      // Handle profile error logic
      state.error = action.payload;
      state.loading = false;
    },
    updateProfile: (state, action) => {
      // Handle update profile logic
      state.profile = action.payload;
      state.loading = false; 
    },
    resetProfile: (state) => {
      // Reset the profile state
      return { ...profileInitialState };
    },
  },
});

export const {
  setLoading,
  deleteAccount,
  getProfile,
  getProfiles,
  getRepos,
  profileError,
  updateProfile,
  resetProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
