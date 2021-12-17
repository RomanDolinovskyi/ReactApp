import React from "react";

import s from "./productText.module.scss";

const ProductText = ({
  title,
  isRequired,
  formik,
  type,
  placeholder,
  height,
}) => {
  return (
    <div className={s.inputWrapper} style={{height: height || "76px",}}>
      <div>
        <label>
          {title}
          {isRequired && <span>*</span>}
        </label>
        {formik.touched[title] && formik.errors[title] ? (
          <span>{formik.errors[title]}</span>
        ) : null}
      </div>
      <input
        name={title}
        type={type || "text"}
        value={formik.values[title]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        style={{
          height: height || "76px",
          border:
            formik.touched[title] && formik.errors[title]
              ? "1px solid red"
              : "1px solid #dedee0",
        }}
      />
    </div>
  );
};

export default ProductText;
