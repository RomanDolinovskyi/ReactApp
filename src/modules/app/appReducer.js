import { handleActions } from "@letapp/redux-actions";
import * as actions from "./appActions";

const initialState = {
  isLoading: true,
  isError: false,
  error: null,
};

export default handleActions(
  {
    [actions.init.start]: (state) => ({
      ...state,
      isLoading: true,
      error: null,
      isError: false,
    }),
    [actions.init.success]: (state, action) => ({
      ...state,
      isLoading: false,
    }),
    [actions.init.error]: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
      isError: true,
    }),
  },
  initialState
);
