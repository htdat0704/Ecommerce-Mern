import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  SET_MESSAGE,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
} from "./authAction";

export const authInit = {
  user: {
    role: "user",
  },
  isAuthenticated: localStorage.getItem("auth-token") ? true : false,
  message: "",
};

export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE:
      return {
        message: "",
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        message: "",
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
        message: "",
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case UPDATE_USER_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case FORGOT_PASSWORD_FAIL:
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_FAIL:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        message: payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        message: "",
        user: {},
      };
    default:
      return state;
  }
};
