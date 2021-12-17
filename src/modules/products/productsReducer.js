import { handleActions } from "@letapp/redux-actions";
import * as products from "./productsActions";

const initialState = {
  latest: {
    list: [],
    isLoading: false,
    isError: false,
  },
  userProduct: {
    list: [],
    isLoading: false,
    isError: false,
  },
  saved: {
    list: [],
    isLoading: false,
    isError: false,
  },
  toggleSaved: {
    isLoading: false,
    isError: false,
  },
  addProduct: {
    isLoading: false,
    isError: false,
  },
  getProduct: {
    isLoading: false,
    isError: false,
  },
  searched: {
    list: [],
    isLoading: false,
    isError: false,
  },
  loadMore: {
    isLoading: false,
    isError: false,
    isAllLoaded: false
  },
  loadMoreSaved: {
    isLoading: false,
    isError: false,
    isAllLoaded: false
  }
};

export default handleActions(
  {
    [products.fetchLatest.start]: (state) => ({
      ...state,

      latest: {
        ...state.latest,
        isLoading: true,
        isError: false,
      },
      loadMore: {
        ...state.loadMore,
        isAllLoaded: false
      }
    }),
    [products.fetchLatest.success]: (state, action) => ({
      ...state,

      latest: {
        ...state.latest,
        isLoading: false,
        list: action.payload.needReplace ? action.payload.result : state.latest.list.concat(action.payload.result),
      },
    }),
    [products.fetchLatest.error]: (state) => ({
      ...state,

      latest: {
        ...state.latest,
        isLoading: false,
        isError: true,
      },
    }),

    [products.fetchUserProducts.start]: (state) => ({
      ...state,

      userProduct: {
        ...state.userProduct,
        isLoading: true,
        isError: false,
      },
    }),
    [products.fetchUserProducts.success]: (state, action) => ({
      ...state,
      userProduct: {
        ...state.userProduct,
        isLoading: false,
        list: action.payload.result,
      },
    }),
    [products.fetchUserProducts.error]: (state) => ({
      ...state,

      userProduct: {
        ...state.userProduct,
        isLoading: false,
        isError: true,
      },
    }),

    [products.fetchSaved.start]: (state) => ({
      ...state,

      saved: {
        ...state.saved,
        isLoading: true,
        isError: false,
      },
    }),
    [products.fetchSaved.success]: (state, action) => ({
      ...state,
      saved: {
        ...state.saved,
        isLoading: false,
        list: state.saved.list.concat(action.payload.result),
      },
    }),
    [products.fetchSaved.error]: (state) => ({
      ...state,
      saved: {
        ...state.saved,
        isLoading: false,
        isError: true,
      },
    }),

    [products.toggleSaved.start]: (state, action) => ({
      ...state,
      toggleSaved: {
        ...state.toggleSaved,
        isLoading: true,
        isError: false,
      },
    }),
    [products.toggleSaved.success]: (state) => ({
      ...state,

      toggleSaved: {
        ...state.toggleSaved,
        isLoading: false,
      },
    }),
    [products.toggleSaved.error]: (state, action) => ({
      ...state,
      toggleSaved: {
        ...state.toggleSaved,
        isLoading: false,
        isError: true,
      },
    }),

    [products.searchProducts.start]: (state) => ({
      ...state,
      searched: {
        ...state.searched,
        isLoading: true,
        isError: false,
      },
    }),
    [products.searchProducts.success]: (state, action) => ({
      ...state,
      searched: {
        ...state.searched,
        isLoading: false,
        list: action.payload.result,
      },
    }),
    [products.searchProducts.error]: (state) => ({
      ...state,
      searched: {
        ...state.searched,
        isLoading: false,
        isError: true,
      },
    }),

    [products.addProduct.start]: (state) => ({
      ...state,
      addProduct: {
        isLoading: true,
        isError: false,
      },
    }),
    [products.addProduct.success]: (state) => ({
      ...state,
      addProduct: {
        ...state.addProduct,
        isLoading: false,
      },
    }),
    [products.addProduct.error]: (state) => ({
      ...state,
      addProduct: {
        isLoading: false,
        isError: true,
      },
    }),

    [products.getProduct.start]: (state) => ({
      ...state,
      getProduct: {
        isLoading: true,
        isError: false,
      },
    }),
    [products.getProduct.success]: (state) => ({
      ...state,
      getProduct: {
        ...state.getProduct,
        isLoading: false,
      },
    }),
    [products.getProduct.error]: (state) => ({
      ...state,
      getProduct: {
        isLoading: false,
        isError: true,
      },
    }),

    [products.loadMore.start]: (state) => ({
      ...state,
      loadMore: {
        isLoading: true,
        isError: false,
      },
    }),
    [products.loadMore.success]: (state, action) => ({
      ...state,
      loadMore: {
        ...state.loadMore,
        isLoading: false,
      },
      latest: {
        ...state.latest,
        list: action.payload.needReplace ? action.payload.result : state.latest.list.concat(action.payload.result),
      },
    }),
    [products.loadMore.error]: (state) => ({
      ...state,
      loadMore: {
        isLoading: false,
        isError: true,
        isAllLoaded: true
      },
    }),

    [products.loadMoreSaved.start]: (state) => ({
      ...state,
      loadMoreSaved: {
        isLoading: true,
        isError: false,
      },
    }),
    [products.loadMoreSaved.success]: (state, action) => ({
      ...state,
      loadMoreSaved: {
        ...state.loadMoreSaved,
        isLoading: false,
      },
      latest: {
        ...state.latest,
        list: action.payload.needReplace ? action.payload.result : state.latest.list.concat(action.payload.result),
      },
    }),
    [products.loadMoreSaved.error]: (state) => ({
      ...state,
      loadMoreSaved: {
        isLoading: false,
        isError: true,
        isAllLoaded: true
      },
    }),

    [products.setIsLoaded]: (state,action) => ({
      ...state,
      loadMoreSaved: {
        ...state.loadMoreSaved,
        isAllLoaded: action.payload
      },
    })
  },
  initialState
);
