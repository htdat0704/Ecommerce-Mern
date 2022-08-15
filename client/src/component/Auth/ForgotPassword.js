import React, { Fragment, useState, useContext } from "react";
import "./ForgotPassword.css";
import LoadingModel from "../Loading/loading";
import MailOutlineIcon from "../../assets/mail.svg";
import { AuthContext } from "../../context/auth/AuthContext";

const ForgotPassword = () => {
  const {
    forgotPassword,
    authState: { message },
    setMessage,
  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    loadingShow();
    forgotPassword(myForm);
  };
  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2500);
    setTimeout(() => {
      setMessage();
    }, 10000);
  };

  return (
    <Fragment>
      <LoadingModel show={loadingSubmit} />
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Forgot Password</h2>

          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <p style={{ color: "red", textAlign: "center" }}>{message}</p>
            <div className="forgotPasswordEmail">
              <img src={MailOutlineIcon} alt="s" className="svgImg" />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input type="submit" value="Send" className="forgotPasswordBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
