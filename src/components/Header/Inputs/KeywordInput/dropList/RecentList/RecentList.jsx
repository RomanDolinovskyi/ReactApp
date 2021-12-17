import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import s from "./RecentList.module.scss";
import Storage from "../../../../../../Api/storage";
import { Icons, icon } from "../../../../../../utils/icons";

const RecentList = ({ handleRemove, chooseSearch }) => {
  const [recent, setRecent] = useState(Storage.getRecentSearch());

  function remove() {
    setRecent(null);
    handleRemove();
  }

  return (
    <div id={s.recentSearch}>
      <div id={s.topSearch}>
        <div id={s.recent}>Recent searches</div>
        <div id={s.clear} onClick={remove}>
          Clear All
        </div>
      </div>
      {recent &&
        recent.map((el) => (
          <div
            className={s.searchRecent}
            key={uuid()}
            onClick={() => chooseSearch(el)}
          >
            <div className={s.dropSearchIcon}>
              {Icons(icon._dropSearch, "16px")}
            </div>
            <div className={s.text}>{el}</div>
          </div>
        ))}
    </div>
  );
};

export default RecentList;
