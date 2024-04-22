import { addRequest, deleteRequest, setMechanics, setRequest,  setRequestLoading,  setRequestSuccess, updateRequest } from "../../component/redux/requestSlice";
import apiErrorHandler from "../../utils/apiErrorHandler";
import api from "../api";

// Action to create or update a service request
export const createOrUpdateServiceRequest = (requestData) => async (dispatch) => {
    dispatch(setRequestLoading());
    try {
      const response = await api.post("/requests", requestData);
      dispatch(addRequest(response.data)); // Adds a new request or updates it in the state
      return { success: true, data: response.data };
    } catch (error) {
      apiErrorHandler(dispatch, error);
      return { success: false };
    } finally {
      dispatch(setRequestLoading(false));
    }
};

// Action to fetch all service requests for the current user
export const fetchServiceRequests = () => async (dispatch) => {
    dispatch(setRequestLoading());
    try {
      const response = await api.get("/requests");
      dispatch(setRequestSuccess(response.data)); // Load all service requests into state
      return { success: true, data: response.data };
    } catch (error) {
      apiErrorHandler(dispatch, error);
      return { success: false };
    } finally {
      dispatch(setRequestLoading(false));
    }
};

// Action to fetch a specific service request by ID
export const fetchServiceRequestById = (id) => async (dispatch) => {
    dispatch(setRequestLoading());
    try {
      const response = await api.get(`/requests/${id}`);
      dispatch(setRequest(response.data)); // Set the current service request in the state
      return { success: true, data: response.data };
    } catch (error) {
      apiErrorHandler(dispatch, error);
      return { success: false };
    } finally {
      dispatch(setRequestLoading(false));
    }
};

// Action to update a service request by ID
export const updateServiceRequestById = (id, updateData) => async (dispatch) => {
    dispatch(setRequestLoading());
    try {
      const response = await api.patch(`requests/${id}`, updateData);
      dispatch(updateRequest(response.data)); // Update the service request in the state
      return { success: true, data: response.data };
    } catch (error) {
      apiErrorHandler(dispatch, error);
      return { success: false };
    } finally {
      dispatch(setRequestLoading(false));
    }
};

// Action to delete a service request by ID
export const deleteServiceRequestById = (id) => async (dispatch) => {
    dispatch(setRequestLoading());
    try {
      await api.delete(`requests/${id}`);
      dispatch(deleteRequest(id)); // Remove the service request from state
      return { success: true };
    } catch (error) {
      apiErrorHandler(dispatch, error);
      return { success: false };
    } finally {
      dispatch(setRequestLoading(false));
    }
};


// Action to fetch the request history for a user
export const fetchRequestHistory = () => async (dispatch) => {
    dispatch(setRequestLoading());
    try {
      const response = await api.get("/requests/history");
      dispatch(setRequestSuccess(response.data)); // Load request history into state
      return { success: true, data: response.data };
    } catch (error) {
      apiErrorHandler(dispatch, error);
      return { success: false };
    } finally {
      dispatch(setRequestLoading(false));
    }
};


export const findMechanics = (location, serviceType) => async (dispatch) => {

  dispatch(setRequestLoading());
  try {
    const response = await api.get(`/requests/find-mechanics?location=${location}&serviceType=${serviceType}`);
    dispatch(setMechanics(response.data)); 
    return { success: true, data: response.data };
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setRequestLoading(false));
  }
};


export const assignMechanic = (requestId, mechanicId) => async (dispatch) => {
  try {
    const response = await api.put('/requests/assign-mechanic', { requestId, mechanicId });
    dispatch(updateRequest(response.data)); // Assuming you have an action to update the local state
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error assigning mechanic:', error);
    return { success: false, error: error };
  }
};