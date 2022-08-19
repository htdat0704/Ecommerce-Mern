import React, { Fragment, useState, useContext } from "react";
import "./UpdateProfile.css";
import MailOutlineIcon from "../../assets/mail.svg";
import FaceIcon from "../../assets/person-circle.svg";
import { AuthContext } from "../../context/auth/AuthContext";
import LoadingModal from "../Loading/loading";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const {
    authState: { user },
    updatedUser,
  } = useContext(AuthContext);

  const { name, email, avatar } = user;

  const [formUpdated, setFormUpdated] = useState({
    name: name,
    email: email,
    avatar: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(avatar.url);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    loadingShow();
    await updatedUser(formUpdated);
    navigate(-1);
  };

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };

  const handleOnChangeUpdate = (e) =>
    setFormUpdated({ ...formUpdated, [e.target.name]: e.target.value });

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setFormUpdated((prev) => {
          return {
            ...prev,
            avatar: reader.result,
          };
        });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <LoadingModal show={loadingSubmit} />
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
          <h2 className="updateProfileHeading">Update Profile</h2>

          <form
            className="updateProfileForm"
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <div className="updateProfileName">
              <img src={FaceIcon} alt="Avatar Preview" className="svgImg" />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={formUpdated.name}
                onChange={handleOnChangeUpdate}
              />
            </div>
            <div className="updateProfileEmail">
              <img
                src={MailOutlineIcon}
                alt="Avatar Preview"
                className="svgImg"
              />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={formUpdated.email}
                onChange={handleOnChangeUpdate}
              />
            </div>

            <div id="updateProfileImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </div>
            <input type="submit" value="Update" className="updateProfileBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
