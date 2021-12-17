import React, { useEffect } from "react";
import { withRouter } from "react-router";
import {
  messagesSelectors,
  messagesOperations,
} from "../../modules/messages/messages";
import {
  compose,
  lifecycle,
  withHandlers,
  withProps,
  withState,
} from "recompose";
import { connect } from "react-redux";
import { chatsSelectors } from "../../modules/chats/chats";
import InboxMessages from "../../components/Inbox/InboxMessages/InboxMessages";

const Chat = ({
  messages,
  isLoading,
  fetchMessages,
  id,
  chat,
  user,
  sendMessage,
  messagesEndRef,
  messagesStartRef,
}) => {
  useEffect(() => {
    fetchMessages();
  }, [id]);
  return (
    <InboxMessages
      {...{
        messages,
        chat,
        user,
        isLoading,
        sendMessage,
        messagesEndRef,
        messagesStartRef,
      }}
    />
  );
};
function mapStateToProps(state, props) {
  return {
    id: props.match.params.id,
    chat: chatsSelectors
      .getChats(state)
      .filter((i) => +i.id === +props.match.params.id)[0],
    messages: messagesSelectors.getMessages(state, props.match.params.id),
    user: state.viewer.user.id,
    isLoading: state.messages.fetchMessages.isLoading,
  };
}

const MapDispatchToProps = {
  fetchMessages: messagesOperations.fetchMessages,
  sendMessage: messagesOperations.sendMessage,
};

const enhancer = compose(
  withState("canLoadMore", "setPossibilityLoadMore", true),
  withProps({
    messagesEndRef: React.createRef(),
    messagesStartRef: React.createRef(),
  }),
  withHandlers({
    fetchMessages: (props) => () => {
      props.fetchMessages(props.id);
    },
    scrollToBottom: (props) => () => {
      props.messagesEndRef.current &&
        props.messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    },
    loadMore: (props) => async () => {
      try {
        if (!props.canLoadMore) return;
        await props.fetchMessages(props.id, props.messages[0].id);
      } catch {
        props.setPossibilityLoadMore(false);
      }
    },
  }),
  withHandlers({
    sendMessage: (props) => async (message, id) => {
      props.scrollToBottom()
      await props.sendMessage(message, props.id, props.user, id);
    },
  }),
  lifecycle({
    async componentDidMount() {
      await this.props.fetchMessages(this.props.match.params.id);
      this.props.scrollToBottom();
      !!this.props.messagesStartRef.current &&
        this.props.messagesStartRef.current.addEventListener(
          "scroll",
          async () => {
            let savedScroll = this.props.messagesStartRef.current.scrollHeight;
            if (this.props.messagesStartRef.current.scrollTop <= 400) {
              if (this.props.isLoading) return;
              try {
                await this.props.loadMore();
                this.props.messagesStartRef.current.scrollTop =
                  this.props.messagesStartRef.current.scrollHeight -
                  savedScroll +
                  this.props.messagesStartRef.current.scrollTop;
              } catch {
                return;
              }
            }
          }
        );
    },
  })
);

export default withRouter(
  connect(mapStateToProps, MapDispatchToProps)(enhancer(Chat))
);
