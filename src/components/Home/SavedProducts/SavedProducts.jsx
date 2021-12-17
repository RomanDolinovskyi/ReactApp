import React, { useEffect } from "react";

import SavedProductsView from "./SavedProductsView/SavedProductsView";
import { productsOperations } from "../../../modules/products/products";
import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";
import Loader from "../../loader/loader";

const SavedProducts = ({ fetchSaved, saved, toggleSaved, user, loadMore, moreIsLoading }) => {
  useEffect(() => {
    if (saved.products.length !== 0) return;
    fetchSaved();
  }, [fetchSaved]);

  return (
      <SavedProductsView {...{ saved, toggleSaved, userID: user.id, loadMore, moreIsLoading }} />
  );
};

function mapStateToProps(state) {
  return {
    saved: {
      products: state.products.saved.list.map(
        (i) => state.entities.products[i]
      ),
      isLoading: state.products.saved.isLoading,
      isError: state.products.saved.isError,
    },
    user: state.viewer.user,
    moreIsLoading: state.products.loadMoreSaved.isLoading,
  };
}

const mapDispatchToProps = {
  fetchSaved: productsOperations.fetchSaved,
  loadMoreSaved: productsOperations.loadMoreSaved,
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    loadMore: (props) => async () => {
      props.loadMoreSaved(props.saved.products.pop().id);
    },
  })
);

export default enhancer(SavedProducts);
