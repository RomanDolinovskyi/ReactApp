import { handleActions } from "@letapp/redux-actions";
import * as products from "./usersActions";

const initialState = {
  list: [],
  isLoading: false,
  isError: false,
};

export default handleActions(
  {
    [products.fetchUser.start]: (state) => ({
      ...state,
      isLoading: true,
      isError: false,
    }),
    [products.fetchUser.success]: (state, action) => ({
      ...state,
      isLoading: false,
      list: [...state.list, action.payload.result],
    }),
    [products.fetchUser.error]: (state) => ({
      ...state,
      isLoading: false,
      isError: true,
    }),
  },
  initialState
);
