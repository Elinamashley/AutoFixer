import { setLoading, setToken, setUser } from "../../component/redux/authSlice";
import apiErrorHandler from "../../utils/apiErrorHandler";
import setAuthToken from "../../utils/setAuthToken";
import api from "../api";


//get login user
export const loadUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await api.get("/auth/user");
    dispatch(setUser(res))
    dispatch(setLoading(false))
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};



// login
export const loginActions = (userData) => async (dispatch) => {
    console.log(userData,"login data here")
  dispatch(setLoading(true));
  try {
    const response = await api.post("/auth/user", userData);
    // Handle success response
    const token = response.data.token;
    // Dispatch the action to set the token and update isAuthenticated
    dispatch(setToken(token));
    setAuthToken(token);
   dispatch(loadUser())
    return { success: true };
  } catch (error) {
    // Handle API error using the shared errorHandler
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};

// Async action using Redux Thunk for API call
export const signupActions = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await api.post("user/create-user", userData);
    return { success: true };
  } catch (error) {
    apiErrorHandler(dispatch, error);
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};



// Action to find mechanics based on user's location and service type



