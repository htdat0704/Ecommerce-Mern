import { UserContext } from "./UserContext";
import { useReducer } from "react";
import { userInit, userReducer } from "./reducer/userReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  getAllUserSuccess,
  getAllUserFail,
  deleteUserFail,
  deleteUserSuccess,
  getOneUserSuccess,
  getOneUserFail,
  updateUserSuccess,
  updateUserFail,
} from "./reducer/userAction";

function UserProvider({ children }) {
  const [userState, dispatch] = useReducer(userReducer, userInit);

  const getAllUsers = async () => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    try {
      const response = await axios.get(
        `http://localhost:4000/auth/admin/users`
      );

      if (response.data.success) {
        dispatch(getAllUserSuccess(response.data.users));
      }
    } catch (error) {
      dispatch(getAllUserFail(error.response.data.message));
    }
  };

  const deleteUser = async (idUser) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/auth/admin/delete/${idUser}`
      );

      if (response.data.success) {
        dispatch(deleteUserSuccess(idUser));
      }
    } catch (error) {
      dispatch(deleteUserFail(error.response.data.message));
    }
  };

  const getOneUser = async (id) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/auth/admin/user/${id}`
      );

      if (response.data.success) {
        dispatch(getOneUserSuccess(response.data.user));
      }
    } catch (e) {
      dispatch(getOneUserFail(e.response.data.message));
    }
  };

  const updateUser = async (formUpdate, userId) => {
    if (localStorage["auth-token"]) {
      setAuthToken(localStorage["auth-token"]);
    }
    console.log(formUpdate);
    try {
      const response = await axios.put(
        `http://localhost:4000/auth/admin/update/${userId}`,
        formUpdate
      );

      if (response.data.success)
        dispatch(updateUserSuccess(response.data.user));
    } catch (error) {
      dispatch(updateUserFail(error.response.data.message));
    }
  };

  const userContext = {
    userState,
    getAllUsers,
    deleteUser,
    getOneUser,
    updateUser,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
