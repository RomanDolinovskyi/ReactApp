import React from "react";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { chatsOperations, chatsSelectors } from "../../modules/chats/chats";
import Loader from "../../components/loader/loader";
import { generatePath, Route, NavLink } from "react-router-dom";
import routes from "../../router/router";
import InboxMessages from "./InboxMessages"

import s from './Inbox.module.scss';
import InboxChats from "../../components/Inbox/InboxChats";
import { messagesSelectors } from "../../modules/messages/messages";

const Inbox = ({ chats, isLoading }) => {
  if (!chats) return <div></div>;
  return (
    <Loader {...{ isLoading }}>
    <div id={s.inbox}>
      <div id={s.chats}>
        {chats.map((item) => (
          <NavLink activeClassName={s.activeChat} className={s.chatLink} to={generatePath(routes.INBOX_CHAT, {id: item.id})} key={item.id}><InboxChats {...{item}} /></NavLink>
        ))}
      </div>
      <Route path={routes.INBOX_CHAT} component={InboxMessages}/>
    </div>
    </Loader>
  );
};

function mapStateToProps(state, props) {
  return {
    messages: messagesSelectors.getLastMessage,
    chats: chatsSelectors.getChats(state),
    isLoading: state.chats.fetchChats.isLoading,
  };
}

const MapDispatchToProps = {
  fetchChats: chatsOperations.fetchChats,
};

const enhancer = compose(
  connect(mapStateToProps, MapDispatchToProps),
  lifecycle({
    async componentDidMount() {
      await this.props.fetchChats();
    },
  }),
);

export default enhancer(Inbox);
