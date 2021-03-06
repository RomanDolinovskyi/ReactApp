import { createAsyncActions } from "@letapp/redux-actions";

export const createChat = createAsyncActions("chats/CREATE_CHAT");
export const fetchChats = createAsyncActions("chats/FETCH_CHATS");
export const addMessage = createAsyncActions("chats/ADD_MESSAGE");
