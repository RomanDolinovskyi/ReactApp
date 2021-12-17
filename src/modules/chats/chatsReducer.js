import { handleActions } from "@letapp/redux-actions";
import * as actions from "./chatsActions";

const initialState = {
  items: [],
  createChat: {
    isLoading: false,
    isError: false
  },
  fetchChats: {
    isLoading: false,
    isError: false
  }
};

export default handleActions(
  {
    [actions.createChat.start]: (state) => ({
      ...state,
      createChat: {
        ...state.createChat,
        isLoading: true,
        isError: false,
      }
    }),
    [actions.createChat.success]: (state) => ({
      ...state,
      createChat: {
        ...state.createChat,
        isLoading: false,
      }
    }),
    [actions.createChat.error]: (state, action) => ({
      ...state,
      createChat: {
        ...state.createChat,
        isLoading: false,
        isError: true,
      }
    }),


    [actions.fetchChats.start]: (state) => ({
      ...state,
      fetchChats: {
        ...state.fetchChats,
        isLoading: true,
        isError: false,
      }
    }),
    [actions.fetchChats.success]: (state, action) => ({
      ...state,
      items: action.payload.result,
      fetchChats: {
        ...state.fetchChats,
        isLoading: false,
      }
    }),
    [actions.fetchChats.error]: (state, action) => ({
      ...state,
      fetchChats: {
        ...state.fetchChats,
        isLoading: false,
        isError: true,
      }
    }),
  },
  initialState
);
