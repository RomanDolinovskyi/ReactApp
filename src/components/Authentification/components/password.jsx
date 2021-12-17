import React from "react";

import changeView from "../switchPasswordView.jsx";

import { Icons, icon } from "../../../utils/icons.jsx";

const Password = ({formik, type, _id, title, forgetPass = false}) => {
  return (
    <div id="password-container">
    <div>
      <label>{title}</label>

      {formik.touched[type] && formik.errors[type] ? (
        <span>{formik.errors[type]}</span>
      ) : null}
    </div>

    <input
      name={type}
      id={_id}
      type="password"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[type]}
      style={{
        border:
          formik.touched[type] && formik.errors[type]
            ? "1px solid red"
            : "1px solid #dedee0",
      }}
    ></input>
    <div onClick={() => changeView(_id)}>
      {Icons(icon._watchPassword, "24px")}
    </div>
    {forgetPass && <span>Don’t remember password?</span>}
  </div>
  );
};

export default Password;
