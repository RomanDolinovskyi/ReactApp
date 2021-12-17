import React from "react";

import s from "./UserAvatar.module.scss";
import { getUserAbbr } from "../../../utils/utils";

const UserAvatar = ({ users, products, isLoading }) => {
  let user = users;
  let name = getUserAbbr(user);



  return (
    <div id={s.UserAvatar}>
      <div id={s.user}>
        <div
          id={s.avatar}
          style={{background: ` center / cover no-repeat ${user.avatar}`}}
        >
          {!user.avatar.includes('url') && name}
        </div>
        <div id={s.fullName}>{user.fullName}</div>
        <div id={s.location}>{user.location}</div>
      </div>
      <div id={s.hardcode}>
        <div className={s.hardcodeItem}>
          <div className={s.title} style={{ color: "#3CB255" }}>
            88%
          </div>
          <div className={s.desc}>Positive feedback</div>
        </div>
        <div className={s.hardcodeItem}>
          <div className={s.title} style={{ color: "##349A89" }}>
            123
          </div>
          <div className={s.desc}>Sales</div>
        </div>
        <div
          className={s.hardcodeItem}
          style={{ color: "#FFFFFF", backgroundColor: "#349A89" }}
        >
          <div className={s.title}>{isLoading ? 0 : products.length}</div>
          <div className={s.desc} style={{ color: "#FFFFFF" }}>
            Active listings
          </div>
          <div id={s.arrow}></div>
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
