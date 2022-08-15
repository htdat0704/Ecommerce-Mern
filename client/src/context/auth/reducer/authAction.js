export const LOGIN_SUCCESS = "login_success";
export const LOGIN_FAIL = "login-fail";

export const REGISTER_SUCCESS = "register_success";
export const REGISTER_FAIL = "register_fail";

export const LOGOUT_USER = "Logout_user";

export const LOAD_USER_SUCCESS = "load_user_success";
export const LOAD_USER_FAIL = "load_user_fail";

export const UPDATE_USER_SUCCESS = "update_user_success";
export const UPDATE_USER_FAIL = "update_user_fail";

export const UPDATE_PASSWORD_SUCCESS = "update_password_success";
export const UPDATE_PASSWORD_FAIL = "update_password_fail";

export const SET_MESSAGE = "set_message";

export const FORGOT_PASSWORD_SUCCESS = "forgot_password_success";
export const FORGOT_PASSWORD_FAIL = "forgot_password_fail";

export const RESET_PASSWORD_SUCCESS = "reset_password_success";
export const RESET_PASSWORD_FAIL = "reset_password_fail";

export const resetPasswordSuccess = (payload) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload,
  };
};

export const resetPasswordFail = (payload) => {
  return {
    type: RESET_PASSWORD_FAIL,
    payload,
  };
};

export const forgotPasswordSuccess = (payload) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload,
  };
};

export const forgotPasswordFail = (payload) => {
  return {
    type: FORGOT_PASSWORD_FAIL,
    payload,
  };
};

export const setMessageFail = () => {
  return {
    type: SET_MESSAGE,
  };
};

export const updatePasswordFail = (payload) => {
  return {
    type: UPDATE_PASSWORD_FAIL,
    payload,
  };
};

export const updatePasswordSuccess = (payload) => {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
    payload,
  };
};
export const updateUserSuccess = (payload) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload,
  };
};

export const updateUserFail = (payload) => {
  return {
    type: UPDATE_USER_FAIL,
  };
};

export const loadUserSuccess = (payload) => {
  return {
    type: LOAD_USER_SUCCESS,
    payload,
  };
};

export const loadUserFail = () => {
  return {
    type: LOAD_USER_FAIL,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const registerSuccess = (payload) => {
  return {
    type: REGISTER_SUCCESS,
    payload,
  };
};

export const registerFail = (payload) => {
  return {
    type: REGISTER_FAIL,
    payload,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const loginFail = (payload) => {
  return {
    type: LOGIN_FAIL,
    payload,
  };
};
