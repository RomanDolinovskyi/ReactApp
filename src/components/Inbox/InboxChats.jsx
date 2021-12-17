import React from "react";

import s from "./InboxChats.module.scss";
import { Icons, icon } from "../../utils/icons";

const InboxChats = ({ item }) => {
  if(!item.product) return <div></div>
  return (
    <div id={s.chat}>
      <div id={s.chatInfo}>
        <div id={s.owner}>{item.message.owner.fullName}</div>
        <div id={s.message}>
          <span>{Icons(icon._lastMessage, "11px")}</span>
          {item.message.text}
        </div>
      </div>
      <div id={s.productInfo}>
        <div
          id={s.productPhoto}
          style={{
            background: !!item.product.photos
              ? ` center / cover no-repeat url(${item.product.photos[0]})`
              : "#" + Math.floor(Math.random() * 1677721).toString(16),
          }}
        ></div>
        <div id={s.productShortInfo}>
          <div id={s.productTitle}>{item.product.title}</div>
          <div id={s.productPrice}>${item.product.price}</div>
        </div>
      </div>
      <div id={s.time}>
        {new Date(item.message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default InboxChats;
