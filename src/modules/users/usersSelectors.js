import { createSelector } from "reselect";
import { productsSelectors } from "../products/products";

const getUserIdSelector = (state, id) => {
  const product = productsSelectors.getProduct(state, id);
  if (!product) return;

  return state.entities.users[product.ownerId];
};

export const getUser = createSelector(getUserIdSelector, (item) => item);




const getUsersSelector = (state, id) => {
  const user = state.entities.users[id]
  return user
}
export const getUserById = createSelector(getUsersSelector, (item) => item);


