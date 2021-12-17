import React, { useState, useEffect } from "react";

import s from "./PriceFilter.module.scss";
import { useLocation } from "react-router";
import { Icons, icon } from "../../../../../utils/icons";

const PriceFilter = ({ setTo, setFrom }) => {
  let location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  useEffect(() => {
    !!urlParams.get("priceFrom") ? setfromPrice(urlParams.get("priceFrom")) : setfromPrice('');
    !!urlParams.get("priceTo") ? setToPrice(urlParams.get("priceTo")) : setToPrice('');
  }, [location.search]);

  function setfromPrice(val) {
    setFrom(val);
    setPriceFrom(val);
  }

  function setToPrice(val) {
    setTo(val);
    setPriceTo(val);
  }

  return (
    <div id={s.priceFilterContainer}>
      <div id={s.searchCategory}>
        <div id={s.categ}>{Icons(icon._categ, "15px")}</div>
        <div id={s.dropCateg}>{Icons(icon._dropCateg, "15px")}</div>
        <input type="text" placeholder="Category" />
      </div>
      <div id={s.serarchPriceFrom}>
        <input
          type="text"
          placeholder="Price From (USD)"
          onInput={(e) => setfromPrice(e.target.value)}
          onChange={(e) => setfromPrice(e.target.value)}
          value={priceFrom}
        />
      </div>
      <hr />
      <div id={s.serarchPriceTo}>
        <input
          type="text"
          placeholder="Price To (USD)"
          onInput={(e) => setToPrice(e.target.value)}
          onChange={(e) => setToPrice(e.target.value)}
          value={priceTo}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
