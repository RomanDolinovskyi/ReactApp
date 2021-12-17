import * as Api from "./../../Api/Api";
import * as actions from "./productsActions";
import { utilsOperations } from "../utils/utils";
import { normalize } from "normalizr";
import * as Schemas from "./../../Api/Schemas";

export function fetchLatest(user, needReplace = true) {
  return async function fetchLatestThunk(dispatch) {
    try {
      dispatch(actions.fetchLatest.start());

      let res = await Api.Products.fetchLatest();

      if (user) {
        let resSave = await Api.Products.fetchSaved();

        res.data.map((el) => {
          resSave.data.map((it) => {
            el.id === it.id ? (el.saved = true) : (el.saved = !!el.saved);
            return false;
          });
          return el;
        });
      }

      const { result, entities } = normalize(res.data, Schemas.ProductList);

      dispatch(actions.fetchLatest.success({ result, entities, needReplace }));
    } catch (err) {
      dispatch(actions.fetchLatest.error());
    }
  };
}

export function fetchUserProducts(id, user) {
  return async function fetchUserProductsThunk(dispatch) {
    try {
      dispatch(actions.fetchUserProducts.start());

      let res = await Api.Products.fetchUserProducts(id);

      if (!!user) {
        let resSave = await Api.Products.fetchSaved();
        res.data.list.map((el) => {
          resSave.data.map((it) => {
            el.id === it.id ? (el.saved = true) : (el.saved = !!el.saved);
            return false;
          });
          return el;
        });
      }
      const { result, entities } = normalize(
        res.data.list,
        Schemas.ProductList
      );

      dispatch(actions.fetchUserProducts.success({ result, entities }));
    } catch (err) {
      dispatch(actions.fetchUserProducts.error());
    }
  };
}

export function fetchSaved() {
  return async function fetchSavedThunk(dispatch) {
    try {
      dispatch(actions.fetchSaved.start());

      let res = await Api.Products.fetchSaved();

      const { result, entities } = normalize(res.data, Schemas.ProductList);

      dispatch(actions.fetchSaved.success({ result, entities }));
      return res;
    } catch (err) {
      dispatch(actions.fetchSaved.error());
      return null;
    }
  };
}

export function toggleSaved(id, saved) {
  return async function toggleSavedThunk(dispatch) {
    try {
      dispatch(actions.toggleSaved.start(id));

      if (saved) {
        await Api.Products.removeFromSaved(id);
      } else {
        await Api.Products.addToSaved(id);
      }

      dispatch(actions.toggleSaved.success());
    } catch (err) {
      dispatch(actions.toggleSaved.error(id));
    }
  };
}

export function addProduct(title, location, description, photos, price) {
  return async function addProductThunk(dispatch) {
    try {
      dispatch(actions.addProduct.start());

      photos &&
        (photos = await Promise.all(
          photos.map(async (photo) => {
            return await dispatch(utilsOperations.uploadImage(photo));
          })
        ));

      await Api.Products.addProduct(
        title,
        description,
        photos,
        location,
        price
      );

      dispatch(actions.addProduct.success());
    } catch (err) {
      dispatch(actions.addProduct.error());
    }
  };
}

export function getProduct(id) {
  return async function getProductThunk(dispatch) {
    try {
      dispatch(actions.getProduct.start());

      const res = await Api.Products.getProduct(id);

      const { entities, result } = normalize(res.data, Schemas.Product);

      dispatch(actions.getProduct.success({ entities, result }));
    } catch (err) {
      dispatch(actions.getProduct.error());
    }
  };
}

export function searchProductsForDroplist(query) {
  return async function searchProductsForDroplistThunk(dispatch) {
    try {
      dispatch(actions.searchProducts.start());

      let res = await Api.Products.searchProducts(query);

      const { result, entities } = normalize(res.data, Schemas.ProductList);

      dispatch(actions.searchProducts.success({ result, entities }));
    } catch (err) {
      dispatch(actions.searchProducts.error());
    }
  };
}

export function searchProductsForListing(query, user) {
  return async function searchProductsForListingThunk(dispatch) {
    try {
      dispatch(actions.fetchLatest.start());
      dispatch(actions.setIsLoaded(false))

      let res = await Api.Products.searchProducts(query);


      if (user) {
        let resSave = await Api.Products.fetchSaved();

        res.data.map((el) => {
          resSave.data.map((it) => {
            el.id === it.id ? (el.saved = true) : (el.saved = !!el.saved);
            return false;
          });
          return el;
        });
      }

      const { result, entities } = normalize(res.data, Schemas.ProductList);

      dispatch(
        actions.fetchLatest.success({ result, entities, needReplace: true })
      );
    } catch (err) {
      dispatch(actions.fetchLatest.error());
    }
  };
}

export function loadMore(search, user, from, offset) {
  return async function loadMoreThunk(dispatch) {
    try {
      dispatch(actions.loadMore.start());
      let res;
      let needReplace = false;
      if (!!search.keywords) {
        needReplace = true;
        search.offset = offset;
        let query = Object.keys(search)
          .filter((key) => !!search[key])
          .map((key) => key + "=" + search[key])
          .join("&");
        res = await Api.Products.searchProducts(query);
      } else res = await Api.Products.fetchLatest(from);
      
      if(res.data.length === 0) dispatch(actions.loadMore.error());
      
      if (user) {
        let resSave = await Api.Products.fetchSaved(from);

        res.data.map((el) => {
          resSave.data.map((it) => {
            el.id === it.id ? (el.saved = true) : (el.saved = !!el.saved);
            return false;
          });
          return el;
        });
      }


      const { result, entities } = normalize(res.data, Schemas.ProductList);

      if (result.length === 0) needReplace = false;


      dispatch(actions.loadMore.success({ result, entities, needReplace }));
    } catch (err) {
    }
  };
}

export function loadMoreSaved(from) {
  return async function loadMoreSavedThunk(dispatch) {
    try {
      dispatch(actions.loadMoreSaved.start());

      let res = await Api.Products.fetchSaved(from);

      const { result, entities } = normalize(res.data, Schemas.ProductList);

      dispatch(actions.fetchSaved.success({ result, entities }));
      dispatch(actions.loadMoreSaved.success({ result, entities }));
    } catch (err) {
      dispatch(actions.loadMoreSaved.error());
    }
  };
}

export function setIsLoaded(bool) {
  return async function setIsLoadedThunk(dispatch) {
      dispatch(actions.loadMoreSaved(bool));
  };
}
