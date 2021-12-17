import React from "react";

import s from "./SubmitButton.module.scss";

const SubmitButton = ({ handleSearch }) => {
  function handleClick() {
    handleSearch();
  }

  return (
    <div id={s.button_container}>
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default SubmitButton;
