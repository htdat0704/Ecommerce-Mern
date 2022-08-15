import React, { Fragment, useState, useContext } from "react";
import "./UpdatePassword.css";
import KeyFill from "../../assets/key-fill.svg";
import Lock from "../../assets/lock-fill.svg";
import UnLock from "../../assets/unlock-fill.svg";
import { AuthContext } from "../../context/auth/AuthContext";
import LoadingModal from "../Loading/loading";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [formPasswordChange, setFormPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const {
    updatePassword,
    authState: { message },
  } = useContext(AuthContext);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleOnChangePassword = (e) => {
    setFormPasswordChange({
      ...formPasswordChange,
      [e.target.name]: e.target.value,
    });
  };

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2500);
  };
  console.log(message);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    loadingShow();
    updatePassword(formPasswordChange);
    navigate(-1);
  };

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }

  //   if (isUpdated) {
  //     alert.success("Profile Updated Successfully");

  //     history.push("/account");

  //     dispatch({
  //       type: UPDATE_PASSWORD_RESET,
  //     });
  //   }
  // }, [dispatch, error, alert, history, isUpdated]);

  return (
    <Fragment>
      <LoadingModal show={loadingSubmit} />
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Update Password</h2>

          <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
            <p style={{ color: "red", textAlign: "center" }}>{message}</p>
            <div className="loginPassword">
              <img src={KeyFill} alt="oldpassword" className="imgSVG" />
              <input
                type="password"
                placeholder="Old Password"
                required
                name="oldPassword"
                value={formPasswordChange.oldPassword}
                onChange={handleOnChangePassword}
              />
            </div>

            <div className="loginPassword">
              <img src={Lock} alt="oldpassword" className="imgSVG" />
              <input
                type="password"
                placeholder="New Password"
                required
                name="newPassword"
                value={formPasswordChange.newPassword}
                onChange={handleOnChangePassword}
              />
            </div>
            <div className="loginPassword">
              <img src={UnLock} alt="oldpassword" className="imgSVG" />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                required
                value={formPasswordChange.confirmPassword}
                onChange={handleOnChangePassword}
              />
            </div>
            <input type="submit" value="Change" className="updatePasswordBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
