import { handleActions } from "@letapp/redux-actions";
import * as search from "./searchActions";

const initialState = {
  keywords: "",
  location: "",
  priceFrom: "",
  priceTo: "",
};

export default handleActions(
  {
    [search.changeKeywords]: (state, action) => ({
      ...state,
      keywords: action.payload,
    }),

    [search.changeLocation]: (state, action) => ({
      ...state,
      location: action.payload,
    }),

    [search.changePriceFrom]: (state, action) => ({
      ...state,
      priceFrom: action.payload,
    }),

    [search.changePriceTo]: (state, action) => ({
      ...state,
      priceTo: action.payload,
    }),
  },
  initialState
);
