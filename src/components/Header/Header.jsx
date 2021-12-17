import React from "react";

import s from "./Header.module.scss";
import { Icons, icon } from "../../utils/icons";
import { Link, withRouter } from "react-router-dom";
import routes from "../../router/router";
import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";
import { productsOperations } from "../../modules/products/products";
import ProfileIcon from "./ProfileIcon/ProfileIcon";
import InboxLink from "./InboxLink/InboxLink";
import SellButton from "./SellButton/SellButton";
import SavedLink from "./SavedLink/SavedLink";
import KeywordInput from "./Inputs/KeywordInput/KeywordInput";
import { searchOperations } from "../../modules/search/search";
import LocationInput from "./Inputs/LocationInput/LocationInput";
import SubmitButton from "./Inputs/SubmitButton/SubmitButton";
import Storage from "../../Api/storage";

const Header = ({ logout, user, handleSearch, location, changeLocation }) => {
  let isAuth = location.pathname.includes("/auth");
  let isSaved = location.pathname.includes("/saved");
  let isMain = location.pathname.includes("/main");

  return (
    <div
      id={s.header_container}
      style={{
        background: isAuth
          ? "#F2F2F2"
          : "linear-gradient(180deg, #090810 0%, #171236 100%)",
      }}
    >
      <div id={s.header_top}>
        <Link to={routes.HOME}>
          {isAuth
            ? Icons(icon._ApikoLogo, "102px")
            : Icons(icon._ApikoLogoWHITE, "102px")}
        </Link>

        <div id={s.header_links}>
          <InboxLink {...{ user }} />
          <SellButton {...{ user }} />
          <ProfileIcon {...{ user, isAuth }} />
          <SavedLink {...{ user, isSaved }} />
        </div>
      </div>
      {isMain && (
        <div id={s.header_bottom}>
          <KeywordInput {...{ handleSearch }} />
          <LocationInput {...{ changeLocation }} />
          <SubmitButton {...{ handleSearch }} />
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.viewer.user,
    keywords: state.search.keywords,
    isLoading: state.viewer.viewer.isLoading,
    searchLocation: state.search.location,
    priceFrom: state.search.priceFrom,
    priceTo: state.search.priceTo,
  };
}

const mapDispatchToProps = {
  fetchListing: productsOperations.searchProductsForListing,
  setKeywords: searchOperations.changeKeywords,
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withHandlers({
    handleSearch: (props) => (val) => {
      props.setKeywords(!!val ? val : props.keywords);
      Storage.setSearch(!!val ? val : props.keywords);
      if (!props.keywords && !val) return;
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
      props.history.push(routes.HOME + "?" + query);
      props.fetchListing(
        query,
        !!props.user
      );
      // props.setKeywords(null)
    },
  })
);

export default enhancer(Header);
