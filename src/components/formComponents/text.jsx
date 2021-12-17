import React from "react";

const Text = ({ formik, type, placeholder }) => {
  return (
    <div id="email-container">
      <div>
        <label>{type}</label>

        {formik.touched[type] && formik.errors[type] ? (
          <span>{formik.errors[type]}</span>
        ) : null}
      </div>

      <input
        name={type}
        type="text"
        placeholder={placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[type] || ""}
        style={{
          border:
            formik.touched[type] && formik.errors[type]
              ? "1px solid red"
              : "1px solid #dedee0",
        }}
      ></input>
    </div>
  );
};

export default Text;
