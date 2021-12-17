import { createAction } from '@letapp/redux-actions';

export const changeKeywords = createAction('search/CHANGE_KEYWORDS');
export const changeLocation = createAction('search/CHANGE_LOCATION');
export const changePriceFrom = createAction('search/CHANGE_PRICE_FROM');
export const changePriceTo = createAction('search/CHANGE_PRICE_TO');
