import * as actions from "./searchActions";

export function changeKeywords(keywords) {
  return function changeKeywordsThunk(dispatch) {
    dispatch(actions.changeKeywords(keywords));
  };
}
export function changeLocation(location) {
  return function changeLocationThunk(dispatch) {
    dispatch(actions.changeLocation(location));
  };
}
export function changePriceFrom(priceFrom) {
  return function changePriceFromThunk(dispatch) {
    dispatch(actions.changePriceFrom(priceFrom));
  };
}
export function changePriceTo(priceTo) {
  return function changePriceToThunk(dispatch) {
    dispatch(actions.changePriceTo(priceTo));
  };
}
