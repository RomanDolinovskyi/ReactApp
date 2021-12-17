import React, { useState } from "react";

import s from "./CreateChatWindow.module.scss";
import { getUserAbbr } from "../../../utils/utils";
import { Link, generatePath } from "react-router-dom";
import routes from "../../../../router/router";
import { Icons, icon } from "../../../../utils/icons";

const CreateChatWindow = ({
  product,
  user,
  sendMessage,
  chatIsLoading,
  messageIsLoading
}) => {
  const [message, setMessage] = useState("");
  
  function handleSubmit(e){
    sendMessage(message, product.chatId)
  }

  return (
    <div id={s.container} onClick={(e) => e.stopPropagation()}>
      <div id={s.title}>Contact Seller</div>
      <div id={s.productTitle}>Subject: {product.title}</div>
      <div id={s.userInfo}>
        <Link to={generatePath(routes.USER, {id: user.id})}><div
          id={s.userAvatar}
          style={{background: ` center / cover no-repeat ${user.avatar}`}}
        >
          {!user.avatar.includes('url') && getUserAbbr(user)}
        </div>
        </Link>
        <div id={s.userData}>
          <div id={s.fullName}>{user.fullName}</div>
          <div id={s.userLocation}>{user.location}</div>
        </div>
      </div>
      <label htmlFor={s.messageArea}>Message</label>
      <textarea
        onInput={(e) => setMessage(e.target.value)}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='For example: Hey!...'
        value={message}
      />
      <button onClick={handleSubmit}>{(chatIsLoading || messageIsLoading) ? Icons(icon._loader, "50px", "#f2f2f2") : 'Submit'}</button>
    </div>
  );
};

export default CreateChatWindow;
