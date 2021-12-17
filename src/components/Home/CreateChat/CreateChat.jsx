import React from "react";
import {
  productsSelectors,
  productsOperations,
} from "../../../modules/products/products";
import { usersSelectors, usersOperations } from "../../../modules/users/users";
import { connect } from "react-redux";
import { withRouter, generatePath } from "react-router";
import { compose, lifecycle, withHandlers } from "recompose";
import Loader from "../../loader/loader";
import CreateChatWindow from "./CreateChatWindow/CreateChatWindow";
import { messagesOperations } from "../../../modules/messages/messages";
import routes from "../../../router/router";
import { chatsOperations } from "../../../modules/chats/chats";

const CreateChat = ({
  product,
  user,
  userisLoading,
  productisLoading,
  sendMessage,
  messageIsLoading,
  chatIsLoading,
}) => {
  return (
    <Loader {...{ isLoading: productisLoading }}>
      {product && (
        <CreateChatWindow
          {...{
            product,
            user,
            userisLoading,
            sendMessage,
            messageIsLoading,
            chatIsLoading,
          }}
        />
      )}
    </Loader>
  );
};

function mapStateToProps(state, props) {
  return {
    product: productsSelectors.getProduct(state, props.match.params.id),
    user: usersSelectors.getUser(state, props.match.params.id),
    userisLoading: state.users.isLoading,
    productisLoading: state.products.getProduct.isLoading,
    messageIsLoading: state.messages.sendMessage.isLoading,
    chatIsLoading: state.chats.createChat.isLoading,
    viewer: state.viewer.user
  };
}

const mapDispatchToProps = {
  getProduct: productsOperations.getProduct,
  fetchUser: usersOperations.fetchUser,
  sendMessage: messagesOperations.sendMessage,
  createChat: chatsOperations.createChat,
};

const enhancer = compose(
  lifecycle({
    async componentDidMount() {
      try {
        await this.props.getProduct(this.props.match.params.id);
        if(this.props.user.id === this.props.viewer.id) this.props.history.push(routes.HOME)
      } catch (Err) {
        console.log(Err);
      }
    },
  }),
  withHandlers({
    sendMessage: (props) => async (message) => {
      try {
        const chatID = await props.createChat(props.product.id, message);
        props.history.push(generatePath(routes.INBOX_CHAT, { id: chatID }));
      } catch(err) {
        await props.sendMessage(message, props.product.chatId, props.user);
        props.history.push(
          generatePath(routes.INBOX_CHAT, { id: props.product.chatId })
        );
      }
    },
  })
);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(enhancer(CreateChat))
);
