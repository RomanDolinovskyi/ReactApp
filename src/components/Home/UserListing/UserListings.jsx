import React from "react";
import UserAvatar from "./UserAvatar/UserAvatar";

import Product from "./../../product/product";

import s from "./UserListings.module.scss";
import Loader from "../../loader/loader";
import Footer from "../../Footer/Footer";

const UserListItems = ({ users, products, toggleSaved, isLoading }) => {
  return (
    <>
    <div id={s.listWrapper}>
      <UserAvatar {...{ users, products, isLoading }} />
      <div id={s.itemsContainer}>
        <Loader {...{ isLoading, heigth: 0 }}>
          {products.map((item) => (
            <Product {...{ item, toggleSaved, userID: item.ownerId }} key={item.id} />
          ))}
        </Loader>
      </div>
    </div>
    {!isLoading && (() => <Footer />)()}
    </>
  );
};

export default UserListItems;
