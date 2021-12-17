import React from "react";
import { Link, generatePath, NavLink } from "react-router-dom";
import routes from "../../../router/router";

import { v4 as uuid } from 'uuid'

import s from "./InboxMessages.module.scss";
import { Icons, icon } from "../../../utils/icons";
import { getUserAbbr } from "../../utils/utils";
import Loader from "../../loader/loader";
import ParticipantMessage from "./Message/participantMessage";
import UserMessage from "./Message/userMessage";
import { useEffect } from "react";

const InboxMessages = ({
  chat,
  messages,
  user,
  isLoading,
  sendMessage,
  messagesEndRef,
  messagesStartRef,
}) => {
  
  useEffect(() => {
    messagesEndRef.current && messagesEndRef.current.scrollIntoView({behavior: 'smooth'})
  }, [chat && chat.id])

  if (!chat) return <div></div>;

  function handleSend(e) {
    if (e.key !== "Enter") return;
    sendMessage(e.target.value);
    e.target.value = "";
  }

  function sendAgain(id, message) {
    sendMessage(message, id);
  }

  return (
    <div id={s.messagesWrapper}>
      <div id={s.chatInfo}>
        <div id={s.participant}>
          <div
            id={s.participantPhoto}
            style={{
              background: ` center / cover no-repeat ${chat.participants.avatar}`,
            }}
          >
            <NavLink
              id={s.participantAbbr}
              to={generatePath(routes.USER, { id: chat.participants.id })}
            >
              {!chat.participants.avatar.includes("url(") &&
                getUserAbbr(chat.participants)}
            </NavLink>
          </div>

          <div id={s.participantName}>
            <Link to={generatePath(routes.USER, { id: chat.participants.id })}>
              {chat.participants.fullName}
            </Link>
          </div>
        </div>
        <div id={s.productInfo}>
          <div
            id={s.productPhoto}
            style={{
              background: !!chat.product.photos
                ? ` center / cover no-repeat url(${chat.product.photos[0]})`
                : "gray",
            }}
          ></div>
          <div id={s.productShortInfo}>
            <div id={s.productTitle}>{chat.product.title}</div>
            <div id={s.productPrice}>${chat.product.price}</div>
          </div>
          <Link to={generatePath(routes.PRODUCT, { id: chat.product.id })}>
            {Icons(icon._linkToProduct, "18px")}
          </Link>
          <div id={s.more}></div>
        </div>
      </div>
      <div id={s.chatMessages} ref={messagesStartRef}>
        <Loader
          {...{ isLoading, size: "20px", heigth: "0", margin: "-10px" }}
        />
        {messages &&
          messages.map((message) =>
            message.ownerId === user ? (
              <UserMessage {...{ message, sendAgain }} key={uuid()}/>
            ) : (
              <ParticipantMessage {...{ message }} key={uuid()}/>
            )
          )}
        <div ref={messagesEndRef} style={{ height: "1px" }} />
      </div>
      <input
        onKeyPress={(e) => handleSend(e)}
        name="message"
        type="text"
        placeholder="Type your message here..."
      />
    </div>
  );
};

export default InboxMessages;
