import React from "react";

import s from "./../InboxMessages.module.scss";

const ParticipantMessage = ({ message }) => {
  return (
    <div key={message.id} className={s.participantMessage}>
      <div className={s.participantDecor}></div>
      <div className={s.participantMessageText}>{message.text}</div>
    </div>
  );
};

export default ParticipantMessage;
