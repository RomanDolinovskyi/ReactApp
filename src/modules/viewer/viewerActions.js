import { createAsyncActions, createAction } from "@letapp/redux-actions";

export const fetchViewer = createAsyncActions("viewer/fetchViewer");
export const logout = createAction("viewer/LOGOUT");
export const setViewer = createAction("viewer/SET_VIEWER");
export const edit = createAsyncActions("viewer/EDIT_VIEWER");
