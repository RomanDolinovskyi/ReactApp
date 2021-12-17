import React from "react";
import { Link } from "react-router-dom";
import routes from "../../../router/router";

const SellButton = () => {
  return (
    <Link to={routes.ADD_PRODUCT}>
      <button id="sell_button">Sell</button>
    </Link>
  );
};

export default SellButton;
