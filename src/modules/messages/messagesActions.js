import { createAsyncActions, createAction } from "@letapp/redux-actions";

export const fetchMessages = createAsyncActions("messages/FETCH_MESSAGES");
export const sendMessage = createAsyncActions("messages/SEND_MESSAGE");
export const handleSocketMessage = createAsyncActions("messages/HANDLE_SOCKET_MESSAGE");
export const addMessage = createAction("messages/ADD_MESSAGE");


