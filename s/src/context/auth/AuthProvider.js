import { AuthContext } from "./AuthContext";
import { useReducer } from "react";
import axios from "axios";
import { authInit, authReducer } from "./reducer/authReducer";
import {
  loginSuccess,
  loginFail,
  registerFail,
  registerSuccess,
  logoutUser,
  loadUserFail,
  loadUserSuccess,
  updateUserFail,
  updateUserSuccess,
} from "./reducer/authAction";
import setAuthToken from "../../utils/setAuthToken";

function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, authInit);

  const loginUser = async (formData) => {
    try {
      const config = { headers: { "Context-Type": "application/json" } };

      const response = await axios.post(
        `http://localhost:4000/auth/login`,
        formData,
        config
      );

      if (response.data.success) {
        dispatch(loginSuccess(response.data));
        localStorage.setItem("auth-token", response.data.token);
      }
    } catch (e) {
      dispatch(loginFail(e.response.data.message));
    }
  };

  const registerUser = async (formData) => {
    try {
      const config = { headers: { "Context-Type": "multipart/form-data" } };

      const response = await axios.post(
        `http://localhost:4000/auth/register`,
        formData,
        config
      );

      if (response.data.success) {
        dispatch(registerSuccess(response.data));
        localStorage.setItem("auth-token", response.data.token);
      }
    } catch (e) {
      dispatch(registerFail(e.response.data.message));
    }
  };

  const loadUser = async () => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }

    try {
      const response = await axios.get(`http://localhost:4000/auth/details`);

      if (response.data.success) {
        dispatch(loadUserSuccess(response.data));
      }
    } catch (e) {
      dispatch(loadUserFail(e.response.data.message));
    }
  };

  const logoutUserNow = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/auth/logout`);
      localStorage.removeItem("auth-token");
      setAuthToken(localStorage["auth-token"]);
      if (response.data.success) {
        dispatch(logoutUser());
      }
    } catch (e) {
      console.log(e.request.response.message);
    }
  };

  const updatedUser = async (formData) => {
    try {
      if (localStorage["auth-token"]) {
        setAuthToken(localStorage["auth-token"]);
      }
      const config = { headers: { "Context-Type": "multipart/form-data" } };

      const response = await axios.put(
        `http://localhost:4000/auth/details/update`,
        formData,
        config
      );

      if (response.data.success) {
        dispatch(updateUserSuccess(response.data));
      }
    } catch (e) {
      dispatch(updateUserFail());
    }
  };

  const authContext = {
    authState,
    loginUser,
    registerUser,
    loadUser,
    logoutUserNow,
    updatedUser,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
