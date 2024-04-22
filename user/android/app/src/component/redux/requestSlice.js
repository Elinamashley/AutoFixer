import { createSlice } from '@reduxjs/toolkit';

const serviceRequestInitialState = {
  requests: [],
  request: null,
  mechanics: [], 
  loading: false,
  error: null
};

const serviceRequestSlice = createSlice({
  name: 'request',
  initialState: serviceRequestInitialState,
  reducers: {
    setRequestLoading: (state) => {
      state.loading = true;
    },
    setRequestSuccess: (state, action) => {
      state.loading = false;
      state.requests = action.payload;
    },
    setMechanics: (state, action) => {
      state.mechanics = action.payload;
    },
    setRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setRequest: (state, action) => {
      state.request = action.payload;
    },
    clearRequest: (state) => {
      state.request = null;
    },
    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    updateRequest: (state, action) => {
      state.requests = state.requests.map(request =>
        request._id === action.payload._id ? action.payload : request
      );
    },
    deleteRequest: (state, action) => {
      state.requests = state.requests.filter(
        request => request._id !== action.payload
      );
    },
    resetServiceRequestState: (state) => {
      return { ...serviceRequestInitialState };
    }
  }
});

export const {
  setRequestLoading,
  setRequestSuccess,
  setRequestFail,
  setRequest,
  clearRequest,
  addRequest,
  updateRequest,
  deleteRequest,
  setMechanics,
  resetServiceRequestState
} = serviceRequestSlice.actions;

export default serviceRequestSlice.reducer;
