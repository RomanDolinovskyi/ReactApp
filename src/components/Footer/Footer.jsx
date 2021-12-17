import React from "react";

import s from "./Footer.module.scss";

const Footer = () => {
  return (
    <div id={s.footer}>
      <span>Copyright</span>
      <span>&copy;</span>
      <span>2020</span>
      <span>Privacy</span>
      <span>Policy</span>
    </div>
  );
};

export default Footer;
