import { createSelector } from 'reselect';

const getProductSelector = (state, id) => state.entities.products[id];

export const getProduct = createSelector(getProductSelector , item => item);

