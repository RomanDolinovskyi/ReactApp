import { handleActions } from "@letapp/redux-actions";
import * as actions from "./authActions";

const initialState = {
  login: {
    isLoading: false,
    isError: false,
    error: null,
  },
  register: {
    isLoading: false,
    isError: false,
    error: null,
  },
  restore: {
    isLoading: false,
    isError: false,
    error: null,
  },
};

export default handleActions(
  {
    [actions.login.start]: (state) => ({
      ...state,
      login: {
        ...state.login,
        isLoading: true,
        error: null,
        isError: false,
      },
    }),
    [actions.login.success]: (state) => ({
      ...state,
      login: {
        ...state.login,
        isLoading: false,
      },
    }),
    [actions.login.error]: (state, action) => ({
      ...state,
      login: {
        ...state.login,
        isLoading: false,
        error: action.payload,
        isError: true,
      },
    }),

    [actions.register.start]: (state) => ({
      ...state,
      register: {
        ...state.register,
        isLoading: true,
        error: null,
        isError: false,
      },
    }),
    [actions.register.success]: (state) => ({
      ...state,
      register: {
        ...state.register,
        isLoading: false,
      },
    }),
    [actions.register.error]: (state, action) => ({
      ...state,
      register: {
        ...state.register,
        isLoading: false,
        error: action.payload,
        isError: true,
      },
    }),

    [actions.restore.start]: (state) => ({
      ...state,
      restore: {
        ...state.restore,
        isLoading: true,
        error: null,
        isError: false,
      },
    }),
    [actions.restore.success]: (state) => ({
      ...state,
      restore: {
        ...state.restore,
        isLoading: false,
      },
    }),
    [actions.restore.error]: (state, action) => ({
      ...state,
      restore: {
        ...state.restore,
        isLoading: false,
        error: action.payload,
        isError: true,
      },
    }),
  },
  initialState
);
