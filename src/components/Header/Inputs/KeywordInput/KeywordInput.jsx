import React, { useState, useEffect } from "react";
import DropList from "./dropList/DropList";
import s from "./KeywordInput.module.scss";
import { Icons, icon } from "../../../../utils/icons";
import Storage from "../../../../Api/storage";
import { useLocation } from "react-router";
import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";
import { searchOperations } from "../../../../modules/search/search";
import { productsOperations } from "../../../../modules/products/products";

const KeywordInput = ({
  searched,
  searchedIsLoading,
  keywords,
  changeKeywords,
  fetchDroplist,
  handleSearch,
}) => {
  let location = useLocation();
  let urlParams = new URLSearchParams(location.search);

  const [onFocus, setFocus] = useState(false);
  const [mouseIn, setMouse] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    !!urlParams.get('keywords') ? handleChange(urlParams.get('keywords')) : handleChange('');
  }, [location.search]);

  function handleChange(val) {
    setInputValue(val)
    changeKeywords(val);
    fetchDroplist(val);
  }

  function handleRemove() {
    Storage.removeRecentSearch();
  }

  function chooseSearch(val) {
    handleChange(val)
    setFocus(false);
    handleSearch(val)
  }


  return (
    <div id={s.keywords_container}>
      <div id={s.search_icon}>{Icons(icon._search, "20px")}</div>
      <input
        type="text"
        placeholder="Search products by name"
        onFocus={() => setFocus(true)}
        onBlur={(e) => !mouseIn && setFocus(false)}
        onChange={(e) => handleChange(e.target.value)}
        onInput={(e) => handleChange(e.target.value)}
        value={inputValue}
      />
      {onFocus && (
        <DropList
          {...{
            inputValue,
            searched,
            searchedIsLoading,
            keywords,
            handleRemove,
            chooseSearch,
            setFocus,
            setMouse
          }}
        />
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    searched: state.products.searched.list.map(
      (i) => state.entities.products[i]
    ),
    searchedIsLoading: state.products.searched.isLoading,
  };
}

const mapDispatchToProps = {
  changeKeywords: searchOperations.changeKeywords,
  fetchDroplist: productsOperations.searchProductsForDroplist,
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(() => {
    let timeout;
    return {
      fetchDroplist: (props) => (val) => {
        clearTimeout(timeout);
        props.changeKeywords(val);
        if (!val) return;
        let params = {
          keywords: !!val ? val : props.keywords,
          location: props.searchLocation,
          priceFrom: props.priceFrom,
          priceTo: props.priceTo,
        };
        let query = Object.keys(params)
          .filter((key) => !!params[key])
          .map((key) => key + "=" + params[key])
          .join("&");
        timeout = setTimeout(() => {
          props.fetchDroplist(
            query
          );
        }, 1000);
      },
      changeKeywords: (props) => (value) => {
        props.changeKeywords(value);
      },
    };
  })
);

export default enhancer(KeywordInput);
