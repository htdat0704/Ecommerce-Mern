import {
  GET_ALL_USER_FAIL,
  GET_ALL_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_ONE_USER_FAIL,
  GET_ONE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "./userAction";

export const userInit = {
  usersAdmin: [],
  user: {},
};

export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        usersAdmin: state.usersAdmin.map((user) =>
          user._id === payload._id ? payload : user
        ),
      };
    case GET_ONE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        usersAdmin: state.usersAdmin.filter((user) => user._id !== payload),
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        usersAdmin: payload,
      };
    default:
      return state;
  }
};
