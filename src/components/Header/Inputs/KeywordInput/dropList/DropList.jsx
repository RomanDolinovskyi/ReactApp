import React from "react";

import s from "./DropList.module.scss";
import Item from "./ItemsList/ItemsList";
import RecentList from "./RecentList/RecentList";
import { Icons, icon } from "../../../../../utils/icons";
import { generatePath } from "react-router";
import routes from "../../../../../router/router";
import { Link } from "react-router-dom";

import { v4 as uuid } from 'uuid'
 
const DropList = ({
  searched,
  searchedIsLoading,
  handleRemove,
  chooseSearch,
  inputValue,
  setMouse
}) => {
  const Drop = () =>
    !inputValue ? (
      <RecentList {...{ handleRemove, chooseSearch }} />
    ) : (
      searched.length > 0 &&
      searched.slice(0, 5).map((item) => <Link to={generatePath(routes.PRODUCT, {id: item.id})}  key={uuid()} ><Item {...{ item }} key={item.id} /></Link>)
    );

  return (
    <div
      id={s.searchDropList}
      onMouseOver={() => setMouse(true)}
      onMouseLeave={() => setMouse(false)}
    >
      {searchedIsLoading ? (
        <div id={s.loader}>{Icons(icon._loader, "100px", "#171236")}</div>
      ) : (
        <Drop />
      )}
    </div>
  );
};

export default DropList;
