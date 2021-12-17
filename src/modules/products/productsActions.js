import { createAsyncActions, createAction } from "@letapp/redux-actions";

export const fetchLatest = createAsyncActions('products/FETCH_LATEST');
export const fetchUserProducts = createAsyncActions('products/FETCH_USER_PRODUCTS');
export const fetchSaved = createAsyncActions('products/FETCH_SAVED');
export const toggleSaved = createAsyncActions('products/TOGGLE_SAVED');
export const addProduct = createAsyncActions('products/ADD_PRODUCT');
export const getProduct = createAsyncActions('products/GET_PRODUCT');
export const searchProducts = createAsyncActions('products/SEARCH_PRODUCTS')
export const loadMore = createAsyncActions('products/LOAD_MORE')
export const loadMoreSaved = createAsyncActions('products/LOAD_MORE_SAVED')
export const setIsLoaded = createAction('products/SET_IS_LOADED')
