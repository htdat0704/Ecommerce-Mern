import { useState, useContext, useEffect } from "react";
import "./Auth.css";
import MailOutlineIcon from "../../assets/mail.svg";
import LockOpenIcon from "../../assets/password.svg";
import FaceIcon from "../../assets/person-circle.svg";
import ImageCard from "../../assets/card-image.svg";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import LoadingModel from "../Loading/loading";

const Auth = ({ authRoute }) => {
  const navigate = useNavigate();
  const {
    authState: { message, isAuthenticated },
    loginUser,
    registerUser,
  } = useContext(AuthContext);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [avatarPreview, setAvatarPreview] = useState(ImageCard);
  const [isLoading, setLoading] = useState(false);

  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    name: "",
    avatar: ImageCard,
  });

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setFormRegister({ ...formRegister, avatar: reader.result });
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
    }
  };

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (message) alert(message);
    }, 1000);
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
    setLoading(false);
    return () => clearTimeout(timer);
  }, [message, isAuthenticated]);

  const handleOnChangeLogin = (e) =>
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });

  const submitLoginHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    await loginUser(formLogin);
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await registerUser(formRegister);
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {isLoading && <LoadingModel />}
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form
            className="loginForm"
            ref={loginTab}
            onSubmit={submitLoginHandle}
          >
            <div className="loginEmail">
              <img src={MailOutlineIcon} alt="s" className="svgImg" />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={formLogin.email}
                onChange={handleOnChangeLogin}
              />
            </div>
            <div className="loginPassword">
              <img src={LockOpenIcon} alt="s" className="svgImg" />
              <input
                type="password"
                placeholder="Password"
                value={formLogin.password}
                required
                name="password"
                onChange={handleOnChangeLogin}
              />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <img src={FaceIcon} alt="s" className="svgImg" />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                onChange={registerDataChange}
                value={formRegister.name}
              />
            </div>
            <div className="signUpEmail">
              <img src={MailOutlineIcon} alt="s" className="svgImg" />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                onChange={registerDataChange}
                value={formRegister.email}
              />
            </div>
            <div className="signUpPassword">
              <img src={LockOpenIcon} alt="s" className="svgImg" />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                onChange={registerDataChange}
                value={formRegister.password}
              />
            </div>

            <div id="registerImage">
              <img alt="Avatar Preview" src={avatarPreview} />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
