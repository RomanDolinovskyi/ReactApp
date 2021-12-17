import React from "react";
import routes from "../../router/router";
import { Link, generatePath, useLocation, useHistory } from "react-router-dom";

import s from "./product.module.scss";
import { Icons, icon } from "../../utils/icons";

const Product = ({ item, toggleSaved, userID }) => {
  const location = useLocation();
  const history = useHistory();

  function togSaved(id, bool){
    if(userID){
      toggleSaved(id, bool);
    }else{
      history.push(routes.LOGIN)
    }
  }
  return (
    <div className={s.productItem}>
      <Link
        to={{
          pathname: generatePath(routes.PRODUCT, { id: item.id }),
          data: { product: location },
        }}
      >
        <div
          className={s.product_image}
          style={{ backgroundImage: `url(${item.photos && item.photos[0]})` }}
        >{(!item.photos || !item.photos[0]) && Icons(icon._noImage, '100px')}</div>
        <div className={s.title}>{item.title}</div>
        <div className={s.price}>${item.price}</div>
      </Link>
      {userID !== item.ownerId &&
      <div className={s.saved} onClick={() => togSaved(item.id, item.saved)}>
        {item.saved
          ? Icons(icon._removeFromSaved, "20px", "#349A89")
          : Icons(icon._addToSaved, "20px", "#349A89")}
      </div>}
    </div>
  );
};

export default Product;
