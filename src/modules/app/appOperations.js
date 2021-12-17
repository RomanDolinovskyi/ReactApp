import * as actions from "./appActions";
import * as Api from "./../../Api/Api";
import { viewerOperations } from "../viewer/viewer";
import SocketApi from "../../Api/Socket";
import { messagesOperations } from "../messages/messages";

export function init() {
  return async function initThunk(dispatch) {
    try {
      dispatch(actions.init.start());

      Api.Authentificaton.initialization();

      await dispatch(viewerOperations.fetchViewer());

      dispatch(subscribe())

      dispatch(actions.init.success());
    } catch (err) {
      dispatch(actions.init.error({ message: err.message }));
    }
  };
}

function subscribe(){
  return function subscribeThunk(dispatch){
    SocketApi.handleMessages((message) => {
      console.log(message)
      dispatch(messagesOperations.handleSocketMessage(message))
    })
  }
}