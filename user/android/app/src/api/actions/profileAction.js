import { getProfile, getProfiles, setLoading, updateProfile } from "../../component/redux/profileSlice";
import apiErrorHandler from "../../utils/apiErrorHandler";
import api from "../api";


export const createOrUpdateProfile = (profileData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.post("/profiles", profileData); 
      dispatch(updateProfile(response.data)); // Assuming updateProfile is a reducer action
      return { success: true, data: response.data };
    } catch (error) {
      apiErrorHandler(dispatch, error);
      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };
  

export const fetchAllProfiles = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get("/profiles");
      dispatch(getProfiles(response.data)); // Assuming getProfiles is a reducer action to store profiles
      return { success: true, data: response.data };
    } catch (error) {
      apiErrorHandler(dispatch, error);
      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };
  

  export const fetchCurrentUserProfile = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await api.get("/profiles/me"); // Adjust the endpoint as necessary
      dispatch(getProfile(response.data)); // Assuming getProfile is a reducer action to store the current profile
      return { success: true, data: response.data };
    } catch (error) {
      apiErrorHandler(dispatch, error);
      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };
  