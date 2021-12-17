import React from "react";
import Product from "../../../product/product";

import s from "./SavedProductsView.module.scss";
import Loader from "../../../loader/loader";
import Footer from "../../../Footer/Footer";

const SavedProductsView = ({ saved, toggleSaved, userID }) => {
  return (
    <>
    <div id={s.savedContainer}>
      <div id={s.savedCounter}>
        Saved Products{" "}
        <span>({saved.products.filter((el) => el.saved === true).length})</span>
      </div>
      <Loader isLoading={saved.isLoading}/>
      {saved.products.map((item) => (
        <Product {...{ item, toggleSaved, userID }} key={item.id} />
      ))}
    </div>
      {!saved.isLoading && (() => <Footer />)()}
    </>
  );
};

export default SavedProductsView;
