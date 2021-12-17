import React, { useEffect, useState } from "react";

import routes from "../../../router/router";
import { Link, generatePath } from "react-router-dom";

import s from "./ProfileIcon.module.scss";
import { Icons, icon } from "../../../utils/icons";
import ModalProfile from "./ModalProfile/ModalProfile";
import { viewerOperations } from "../../../modules/viewer/viewer";
import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";
import { getUserAbbr } from "../../utils/utils";

const ProfileIcon = ({ user, logout, isHeader = true, isLoading, isAuth }) => {
  const [abbr, setAbbr] = useState("");
  const [info, showInfo] = useState(false);

  useEffect(() => {
    if (user) {
      let name = getUserAbbr(user);
      setAbbr(name);
    }
  }, [user, isLoading]);

  function toggleInfo() {
    showInfo(!info);
  }

  function handleClick() {
    logout();
    toggleInfo();
  }

  return (
    <div id={isHeader ? s.container : ""}>
      {isLoading ? (
        Icons(icon._loader, "42px", "#f1c40f")
      ) : user ? (
        <div
          id={s.icon_container}
          onMouseEnter={toggleInfo}
          onMouseLeave={toggleInfo}
        ><Link to={generatePath(routes.USER, {id: user.id})}>
          <div
            id={s.icon}
            style={{ background: `center / cover no-repeat ${user.avatar}`}}
            onClick={toggleInfo}
          >
            {user.avatar && !user.avatar.includes('url(') && abbr}
          </div>
          </Link>
          {isHeader && info && (
            <ModalProfile {...{ user, handleClick, toggleInfo }} />
          )}
        </div>
      ) : (
        <Link to={routes.LOGIN}>
          <button style={{ color: isAuth ? "#2B2B2B" : "#FFFFFF" }}>
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isLoading: state.viewer.viewer.isLoading,
  };
}

const mapDispatchToProps = {
  logout: viewerOperations.logout,
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers((props) => ({
    logout: (props) => () => {
      props.logout();
    },
  }))
);

export default enhancer(ProfileIcon);
