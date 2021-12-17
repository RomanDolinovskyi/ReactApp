import React, { useState, useEffect } from "react";

import s from "./LocationInput.module.scss";
import { Icons, icon } from "../../../../utils/icons";
import { useLocation } from "react-router";

import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";
import { searchOperations } from "../../../../modules/search/search";

const LocationInput = ({ changeLocation }) => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);


  const [locationValue, setLocation] = useState('');

  useEffect(() => {
    !!urlParams.get("location") ? handleChange(urlParams.get("location")) : handleChange('');
  }, [location.search]);

  function handleChange(val){
    setLocation(val);
    changeLocation(val)
  }

  return (
    <div id={s.location_container}>
      <div id={s.location_icon}>{Icons(icon._location, "15px")}</div>
      <input
        type="text"
        placeholder="Location"
        onInput={(e) => handleChange(e.target.value)}
        onChange={(e) => handleChange(e.target.value)}
        value={locationValue}
      />
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
  setLocation: searchOperations.changeLocation,
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers((props) => ({
    changeLocation: (props) => (value) => {
      props.setLocation(value);
    },
  }))
);

export default enhancer(LocationInput);
