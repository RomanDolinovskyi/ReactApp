import { handleActions } from "@letapp/redux-actions";
import * as actions from "./utilsActions";

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
};

export default handleActions(
  {
    [actions.uploadImage.start]: (state) => ({
      ...state,
      isLoading: true,
      error: null,
      isError: false,
    }),
    [actions.uploadImage.success]: (state, action) => ({
      ...state,
      isLoading: false,
    }),
    [actions.uploadImage.error]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
      isError: true,
    }),
  },
  initialState
);
