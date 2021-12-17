import React, { useEffect } from "react";

import LatestProductsView from "./LatestProductsView/LatestProductsView";

import { useLocation } from "react-router";
import { productsOperations } from "../../../modules/products/products";
import { searchOperations } from "../../../modules/search/search";
import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";
import Loader from "../../loader/loader";

const LatestProducts = ({
  user,
  fetchLatest,
  latest,
  toggleSaved,
  fetchSearch,
  setFrom,
  setTo,
  priceFrom,
  priceTo,
  loadMore,
  moreIsLoading,
  setKeywords,
  allLoaded,
  setIsLoaded,
}) => {
  let location = useLocation();

  useEffect(() => {
    if (!location.search) {
      setKeywords(null);
      fetchLatest(!!user);
    } else {
      let params = new URLSearchParams(location.search);

      let obj = decodeURI(params)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"');
      obj = JSON.parse('{"' + obj + '"}');

      let query = Object.keys(obj)
        .filter((key) => !!obj[key])
        .map((key) => key + "=" + obj[key])
        .join("&");

      fetchSearch(query, !!user);
    }
  }, [location.search]);

  return (
      <LatestProductsView
        {...{
          latest,
          toggleSaved,
          setFrom,
          setTo,
          priceFrom,
          priceTo,
          user,
          loadMore,
          moreIsLoading,
          allLoaded,
        }}
      />
  );
};

function mapStateToProps(state) {
  return {
    latest: {
      products: state.products.latest.list.map(
        (i) => state.entities.products[i]
      ),
      isLoading: state.products.latest.isLoading,
      isError: state.products.latest.isError,
    },
    user: state.viewer.user,
    userLoading: state.viewer.viewer.isLoading,
    search: {
      keywords: state.search.keywords,
      location: state.search.location,
      priceFrom: state.search.priceFrom,
      priceTo: state.search.priceTo,
    },
    moreIsLoading: state.products.loadMore.isLoading,
    allLoaded: state.products.loadMore.isAllLoaded,
  };
}

const mapDispatchToProps = {
  fetchLatest: productsOperations.fetchLatest,
  toggleSaved: productsOperations.toggleSaved,
  fetchSearch: productsOperations.searchProductsForListing,
  setPriceFrom: searchOperations.changePriceFrom,
  setPriceTo: searchOperations.changePriceTo,
  loadMore: productsOperations.loadMore,
  setKeywords: searchOperations.changeKeywords,
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    loadMore: (props) => async () => {
      props.loadMore(
        props.search,
        props.user,
        props.latest.products.pop().id,
        props.latest.products.pop().id
      );
    },
    setFrom: (props) => (val) => {
      props.setPriceFrom(val);
    },
    setTo: (props) => (val) => {
      props.setPriceTo(val);
    },
  })
);

export default enhancer(LatestProducts);
