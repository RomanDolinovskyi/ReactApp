import React from "react";

const Email = ({ formik }) => {
  return (
    <div id="email-container">
      <div>
        <label>Email</label>

        {formik.touched.email && formik.errors.email ? (
          <span>{formik.errors.email}</span>
        ) : null}
      </div>

      <input
        name="email"
        type="email"
        placeholder="Example@gmail.com"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        style={{
          border:
            formik.touched.email && formik.errors.email
              ? "1px solid red"
              : "1px solid #dedee0",
        }}
      ></input>
    </div>
  );
};

export default Email;
