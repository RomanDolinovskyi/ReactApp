import { handleActions } from "@letapp/redux-actions";
import * as viewer from "./viewerActions";

const initialState = {
  viewer: {
    isLoading: false,
    isError: false,
  },
  user: null,
};

export default handleActions(
  {
    [viewer.fetchViewer.start]: (state) => ({
      ...state,
      viewer: {
        ...state.viewer,
        isLoading: true,
        isError: false,
      },
    }),
    [viewer.fetchViewer.success]: (state, action) => ({
      ...state,
      user: action.payload.entities.users[action.payload.result],
      viewer: {
        ...state.viewer,
        isLoading: false,
        isError: false,
      },
    }),
    [viewer.fetchViewer.error]: (state) => ({
      ...state,
      viewer: {
        ...state.viewer,
        isLoading: false,
        isError: false,
      },
    }),

    [viewer.edit.start]: (state) => ({
      ...state,
      viewer: {
        ...state.viewer,
        isLoading: true,
        isError: false,
      },
    }),
    [viewer.edit.success]: (state, action) => ({
      ...state,
      user: action.payload,
      viewer: {
        ...state.viewer,
        isLoading: false,
        isError: false,
      },
    }),
    [viewer.edit.error]: (state) => ({
      ...state,
      viewer: {
        ...state.viewer,
        isLoading: false,
        isError: false,
      },
    }),

    [viewer.logout]: (state) => ({
      ...state,
      user: null,
    }),

    [viewer.setViewer]: (state, action) => ({
      ...state,
      user: action.payload,
    }),
  },
  initialState
);
