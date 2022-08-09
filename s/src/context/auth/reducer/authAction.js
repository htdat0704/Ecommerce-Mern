export const LOGIN_SUCCESS = "login_success";
export const LOGIN_FAIL = "login-fail";

export const REGISTER_SUCCESS = "register_success";
export const REGISTER_FAIL = "register_fail";

export const LOGOUT_USER = "Logout_user";

export const LOAD_USER_SUCCESS = "load_user_success";
export const LOAD_USER_FAIL = "load_user_fail";

export const UPDATE_USER_SUCCESS = "update_user_success";
export const UPDATE_USER_FAIL = "update_user_fail";

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
