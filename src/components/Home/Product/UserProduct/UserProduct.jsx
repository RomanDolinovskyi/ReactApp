import React from "react";
import Loader from "../../../loader/loader";

import s from "./UserProduct.module.scss";
import { Icons, icon } from "../../../../utils/icons";
import User from "../User/User";

const UserProduct = ({ product, user, userisLoading, toggleSaved, viewer }) => {
  return (
    <div id={s.userProduct}>
      <div id={s.currentProduct} onClick={(e) => e.stopPropagation()}>
        <div
          id={s.photo}
          style={{
            backgroundImage: `url(${!!product.photos && product.photos[0]})`,
          }}
        > {(!product.photos[0]) ? Icons(icon._noImage, '270px') : <div></div>}
          <div id={s.price}>${product.price}</div>
        </div>
        <div id={s.shortInfo}>
          <div id={s.itemTitle}>
            {product.title}
            <span>
              {new Date(product.createdAt).toLocaleString([], {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div id={s.location}>
            {Icons(icon._location, "10px", "#5C5C5C")}
            <span>{product.location}</span>
          </div>
        </div>
        <div id={s.description}>{product.description}</div>
      </div>
      <div id={s.user}>
        <Loader {...{ isLoading: userisLoading }}>
          <User {...{user, product, toggleSaved, viewer }} />
        </Loader>
      </div>
    </div>
  );
};

export default UserProduct;
