import React from "react";
import Product from "./../../../product/product";

import s from "./LatestProductsView.module.scss";
import PriceFilter from "./PriceFilter/PriceFilter";

import Loader from "../../../loader/loader";
import { Icons, icon } from "../../../../utils/icons";
import Footer from "../../../Footer/Footer";

const LatestProductsView = ({
  latest,
  toggleSaved,
  setFrom,
  setTo,
  priceFrom,
  priceTo,
  user,
  loadMore,
  moreIsLoading,
  allLoaded
}) => {
  return (
    <div>
      <PriceFilter {...{ setTo, setFrom, priceFrom, priceTo }} />
      <Loader isLoading={latest.isLoading} />
      <div id={s.latestContainer}>
        {latest.products.length === 0 && !latest.isLoading && (
          <div id={s.noMatch}>No Results Match</div>
        )}
        {latest.products.map((item) => (
          <Product {...{ item, toggleSaved, userID: user && user.id }} key={item.id} />
        ))}
      </div>
        {!latest.isLoading && !allLoaded && <div id={s.loadMore}><button onClick={loadMore}>{moreIsLoading ? Icons(icon._loader, "50px", "#f2f2f2") : 'Show more'}</button></div>}
        {!latest.isLoading && (() => <Footer />)()}
    </div>
  );
};

export default LatestProductsView;
