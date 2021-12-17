import * as actions from "./messagesActions";
import * as Api from "../../Api/Api";
import * as Schemas from "../../Api/Schemas";
import { normalize } from "normalizr";
import { v4 as uuid } from "uuid";

export function fetchMessages(id, offset) {
  return async function fetchMessagesThunk(dispatch) {
    try {
      dispatch(actions.fetchMessages.start());

      const res = await Api.Messages.fetchMessages(id, offset);

      if(res.data.length === 0) throw new Error('allLoaded');
      
      const { result, entities } = normalize(res.data, Schemas.MessagesList);

      dispatch(actions.fetchMessages.success({ result, entities }));


    } catch (err) {
      dispatch(actions.fetchMessages.error({ message: err.message }));
      if(err.message === 'allLoaded') throw new Error();
    }
  };
}

export function sendMessage(message, chatId, user, messageId) {
  return async function sendMessageThunk(dispatch) {
    let messId = messageId || uuid();

    let entities = {
      messages: {
        [messId]: {
          id: messId,
          chatId,
          ownerId: user,
          text: message,
          isLoading: true,
          isError: false,
          createdAt: new Date().toISOString()
        },
      },
    };

    try {
      dispatch(actions.sendMessage.start({ messId, entities }));

      const res = await Api.Messages.sendMessage(message, chatId);

      const response = normalize(res.data, Schemas.Message);

      entities.messages[messId] = Object.keys(
        response.entities.messages
      ).map((i) => ({ ...response.entities.messages[i], id: messId }))[0];

      dispatch(
        actions.sendMessage.success({ result: response.result, entities })
      );
    } catch (err) {
      console.log(err);
      dispatch(actions.sendMessage.error(messId));
    }
  };
}

export function handleSocketMessage(e) {
  return async function handleSocketMessageThunk(dispatch) {
    if (e.type === "ADD") {
      dispatch(addMessage(e.message));
    }
  };
}

export function addMessage(message) {
  return async function addMessageThunk(dispatch) {
    dispatch(
      actions.sendMessage.success({
        result: message.id,
        entities: {
          messages: {
            [message.id]: {
              ...message,
            },
          },
        },
      })
    );
  };
}
