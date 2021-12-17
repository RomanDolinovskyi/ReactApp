import React from "react";

import s from "./ItemsList.module.scss";

import { v4 as uuid } from "uuid";
import { Icons, icon } from "../../../../../../utils/icons";

const Item = ({ item, isSearchedList }) => {
  return (
    <div key={uuid()} className={s.dropItem} onClick={() => isSearchedList(false)}>
      {!!item.photos ? (
        <div
          className={s.itemIcon}
          style={{ backgroundImage: `url(${item.photos[0]})` }}
        ></div>
      ) : (
        <div  key={uuid()}  className={s.itemIcon}>{Icons(icon._noImage, '25px')}</div>
      )}
      <div className={s.itemText}>
        <div className={s.itemTitle}>{item.title}</div>
        <div className={s.itemPrice}>${item.price}</div>
      </div>
    </div>
  );
};

export default Item;
