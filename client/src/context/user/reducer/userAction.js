export const GET_ALL_USER_SUCCESS = "get_all_user_success";
export const GET_ALL_USER_FAIL = "get_all_user_fail";

export const DELETE_USER_SUCCESS = "delete_user_success";
export const DELETE_USER_FAIL = "delete_user_fail";

export const GET_ONE_USER_SUCCESS = "get_one_user_success";
export const GET_ONE_USER_FAIL = "get_one_user_fail";

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
    payload,
  };
};

export const getOneUserSuccess = (payload) => {
  return {
    type: GET_ONE_USER_SUCCESS,
    payload,
  };
};

export const getOneUserFail = (payload) => {
  return {
    type: GET_ONE_USER_FAIL,
    payload,
  };
};

export const deleteUserSuccess = (payload) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload,
  };
};

export const deleteUserFail = (payload) => {
  return {
    type: DELETE_USER_FAIL,
    payload,
  };
};

export const getAllUserSuccess = (payload) => {
  return {
    type: GET_ALL_USER_SUCCESS,
    payload,
  };
};

export const getAllUserFail = (payload) => {
  return {
    type: GET_ALL_USER_FAIL,
    payload,
  };
};
