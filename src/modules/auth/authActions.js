import { createAsyncActions } from "@letapp/redux-actions";

export const login = createAsyncActions("auth/LOGIN");
export const register = createAsyncActions("auth/REGISTER");
export const restore = createAsyncActions("auth/RESTORE");
