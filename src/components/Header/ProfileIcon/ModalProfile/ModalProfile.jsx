import React from "react";
import { Link } from "react-router-dom";
import routes from "../../../../router/router";

import ProfileIcon from "./../ProfileIcon";
import s from "./../ProfileIcon.module.scss";

const ModalProfile = ({ user, toggleInfo, handleClick }) => {
  return (
    <div id={s.more}>
      <div id={s.userInfo}>
        <ProfileIcon {...{ user, isHeader: false }} />
        <div id={s.user_text}>
          <div id={s.username}>{user.fullName}</div>
          <div id={s.user_email}>{user.email}</div>
        </div>
      </div>
      <Link to={routes.PROFILE_EDIT} onClick={toggleInfo}>
        Edit Profile
      </Link>
      <hr />
      <a href="/" onClick={handleClick}>
        Logout
      </a>
    </div>
  );
};

export default ModalProfile;
