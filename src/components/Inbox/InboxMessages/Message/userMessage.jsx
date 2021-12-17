import React from "react";

import { Icons, icon } from "../../../../utils/icons";

import s from "./../InboxMessages.module.scss";

const UserMessage = ({ message, sendAgain }) => {
  return (
    <div className={s.userMessage} key={message.id}>
      {message.isLoading && (
        <div className={s.trigger}>{Icons(icon._timer, "18px")} </div>
      )}
      {message.isError && (
        <div className={s.trigger}>{Icons(icon._error, "18px")} </div>
      )}
      <div className={s.userDecor}></div>
      <div
        className={s.userMessageText}
        onClick={() => message.isError && sendAgain(message.id, message.text)}
      >
        {message.text}
      </div>
    </div>
  );
};

export default UserMessage;
