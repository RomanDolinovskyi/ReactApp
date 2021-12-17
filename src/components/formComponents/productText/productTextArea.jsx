import React from "react";

import s from "./productText.module.scss";

const ProductTextArea = ({
  title,
  isRequired,
  formik,
  type,
  placeholder,
  height,
}) => {
  return (
    <div className={s.inputWrapper} style={{ height: height || "76px" }}>
      <div>
        <label>
          {title}
          {isRequired && <span>*</span>}
        </label>
        {formik.touched[title] && formik.errors[title] ? (
          <span>{formik.errors[title]}</span>
        ) : null}
      </div>
      <textarea
        name={title}
        type={type || "text"}
        value={formik.values[title]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        style={{
          background: "#f9fafb",
          padding: "10px 10px",
          resize: "none",
          height: height || "76px",
          borderRadius: "5px",
          fontFamily: "Helvetica",
          fontSize: "16px",
          lineHeight: "18px",
          letterSpacing: "0.4px",
          border:
            formik.touched[title] && formik.errors[title]
              ? "1px solid red"
              : "1px solid #dedee0",
        }}
      />
    </div>
  );
};

export default ProductTextArea;
