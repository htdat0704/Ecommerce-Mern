import React, { Fragment, useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
import { useNavigate, useParams } from "react-router-dom";

import AccountTreeIcon from "../../assets/bezier2.svg";
import SpellcheckIcon from "../../assets/wordpress.svg";
import MailAccount from "../../assets/mail.svg";

import LoadingModel from "../Loading/loading";
import SideBar from "./SideBar";

const UpdateUser = () => {
  const {
    userState: { user },
    getOneUser,
    updateUser,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { userId } = useParams();
  const [formUpdate, setFormUpdate] = useState({
    name: "",
    email: "",
    role: "",
  });
  const handleOnChangeUpdate = (e) =>
    setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });

  useEffect(() => {
    const timer = setTimeout(() => {
      getOneUser(userId);
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [userId]);

  useEffect(() => {
    setFormUpdate({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
    });
  }, [getOneUser]);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    loadingShow();
    updateUser(formUpdate, userId);
    navigate("/admin/users", { replace: true });
  };

  return (
    <Fragment>
      <LoadingModel show={isLoading || loadingSubmit} />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update User</h1>

            <div>
              <img src={SpellcheckIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Name"
                required
                value={formUpdate.name || " "}
                onChange={handleOnChangeUpdate}
                name="name"
              />
            </div>

            <div>
              <img src={MailAccount} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Mail"
                required
                value={formUpdate.email || " "}
                onChange={handleOnChangeUpdate}
                name="email"
              />
            </div>

            <div>
              <img src={AccountTreeIcon} alt="s" className="svgImg" />
              <select
                name="role"
                value={formUpdate.role || ""}
                onChange={handleOnChangeUpdate}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button id="createProductBtn" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
