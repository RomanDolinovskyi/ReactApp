import { handleActions } from "@letapp/redux-actions";
import * as actions from "./messagesActions";

const initialState = {
  items: [],
  fetchMessages: {
    isLoading: false,
    isError: false,
  },
  sendMessage: {
    isLoading: false,
    isError: false,
  },
};

export default handleActions(
  {
    [actions.fetchMessages.start]: (state) => ({
      ...state,
      fetchMessages: {
        ...state.fetchMessages,
        isLoading: true,
        isError: false,
      },
    }),
    [actions.fetchMessages.success]: (state, action) => {
      return {
        ...state,
        items: action.payload.result,
        fetchMessages: {
          ...state.fetchMessages,
          isLoading: false,
        },
      };
    },
    [actions.fetchMessages.error]: (state, action) => ({
      ...state,
      fetchMessages: {
        ...state.fetchMessages,
        isLoading: false,
        isError: true,
      },
    }),

    [actions.sendMessage.start]: (state, action) => ({
      ...state,
      items: [...state.items, action.payload],
      sendMessage: {
        isLoading: true,
        isError: false,
      },
    }),
    [actions.sendMessage.success]: (state, action) => ({
      ...state,
      items: [...state.items, action.payload.result],
      sendMessage: {
        isLoading: false,
      },
    }),
    [actions.sendMessage.error]: (state, action) => ({
      ...state,
      sendMessage: {
        isLoading: false,
        isError: true
      }
    }),
  },
  initialState
);
