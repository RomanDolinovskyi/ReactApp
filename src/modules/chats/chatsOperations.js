import * as actions from "./chatsActions";
import * as Api from "../../Api/Api";
import * as Schemas from './../../Api/Schemas';
import { normalize } from "normalizr";

export function createChat(id, message) {
  return async function createChatThunk(dispatch) {
    try {
      dispatch(actions.createChat.start());
      
      const res = await Api.Chats.createChat(id, message);

      const { result } = normalize(res.data, Schemas.Chat);

      dispatch(actions.createChat.success());

      return result;
    } catch (err) {
      console.log(err)
      dispatch(actions.createChat.error({ message: err.message }));
      throw new Error()
    }
  };
}

export function fetchChats() {
  return async function fetchChatsThunk(dispatch) {
    try {
      dispatch(actions.fetchChats.start());

      const res = await Api.Chats.fetchChats();

      const {result, entities } = normalize(res.data, Schemas.ChatsList);

      dispatch(actions.fetchChats.success({result, entities }));
    } catch (err) {
      dispatch(actions.fetchChats.error({ message: err.message }));
    }
  };
}
