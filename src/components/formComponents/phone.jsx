import React from "react";

const Phone = ({ formik }) => {
  return (
    <div>
      <div>
        <label>Phone</label>

        {formik.touched.phone && formik.errors.phone ? (
          <span>{formik.errors.phone}</span>
        ) : null}
      </div>

      <input
        name="phone"
        type="tel"
        placeholder="380"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone || ""}
        style={{
          border:
            formik.touched.phone && formik.errors.phone
              ? "1px solid red"
              : "1px solid #dedee0",
        }}
        max="11"
      ></input>
    </div>
  );
};

export default Phone;
