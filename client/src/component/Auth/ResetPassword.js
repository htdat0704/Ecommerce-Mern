import React, { Fragment, useState, useContext } from "react";
import "./ResetPassword.css";
import LoadingModal from "../Loading/loading";
import { useNavigate, useParams } from "react-router-dom";
import LockOpenIcon from "../../assets/lock-fill.svg";
import LockIcon from "../../assets/unlock-fill.svg";
import { AuthContext } from "../../context/auth/AuthContext";

const ResetPassword = ({ match }) => {
  const {
    authState: { message },
    resetPassword,
    setMesasge,
  } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  let { token } = useParams();
  const navigate = useNavigate();

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    loadingShow();
    resetPassword(token, myForm);
  };

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2500);
    setTimeout(() => {
      setMesasge();
      //   navigate("/login", { replace: true });
    }, 10000);
  };

  const handleClick = () => {
    navigate("/login", { replace: true });
  };

  return (
    <Fragment>
      <LoadingModal show={loadingSubmit} />
      <div className="resetPasswordContainer">
        <div className="resetPasswordBox">
          <h2 className="resetPasswordHeading">Reset Password</h2>

          <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
            <p style={{ color: "red", textAlign: "center" }}>{message}</p>
            <div>
              <img src={LockOpenIcon} alt="oldpassword" className="imgSVG" />
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <img src={LockIcon} alt="oldpassword" className="imgSVG" />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {message === "Update password success" ? (
              <input
                type="submit"
                value="Let's Login"
                className="resetPasswordBtn"
                onClick={handleClick}
              />
            ) : (
              <input
                type="submit"
                value="Update"
                className="resetPasswordBtn"
              />
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
