import React from "react";
import { getUserAbbr } from "../../../utils/utils";
import { Icons, icon } from "../../../../utils/icons";

import s from "./User.module.scss";
import { generatePath, useLocation } from "react-router";
import routes from "../../../../router/router";
import { Link } from "react-router-dom";

const User = ({ user, product, toggleSaved, viewer }) => {
  const location = useLocation();
  if (!user) return <div></div>;
  let saved = product.saved
    ? Icons(icon._removeFromSaved, "14px")
    : Icons(icon._addToSaved, "14px");

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div id={s.userInfo}>
        <div id={s.greenLine}></div>
        <Link to={generatePath(routes.USER, { id: !!user && user.id })}>
          <div
            id={s.userPhoto}
            style={{
              background: ` center / cover no-repeat ${!!user && user.avatar}`,
            }}
          >
            {!user.avatar.includes("url(") && getUserAbbr(user)}
          </div>
        </Link>
        <Link to={generatePath(routes.PROFILE, { id: !!user && user.id })}>
          <div id={s.userFullname}>{!!user && user.fullName}</div>
        </Link>
        <div id={s.userLocation}>{!!user && user.location}</div>
      </div>
      {(viewer && viewer.id) !== user.id && (
        <div>
          <Link
            to={{
              pathname: generatePath(routes.MODAL_CHAT, { id: product.id }),
              data: { chat: location },
            }}
          >
            <div id={s.startChat}>Chat with seller</div>
          </Link>
          {!viewer ? (
            <Link to={generatePath(routes.LOGIN)}>
              <div
                id={s.saved}
                onClick={() => toggleSaved(product.id, product.saved)}
              >
                {saved}
                <span>
                  {product.saved ? "Remove from favourite" : "Add to favourite"}
                </span>
              </div>
            </Link>
          ) : (
            <div
              id={s.saved}
              onClick={() => toggleSaved(product.id, product.saved)}
            >
              {saved}
              <span>
                {product.saved ? "Remove from favourite" : "Add to favourite"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
