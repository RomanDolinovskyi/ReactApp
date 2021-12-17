import React from "react";

const FullName = ({formik}) => {
  return (
    <div>
        <div>
          <label>Full name</label>

          {formik.touched.fullName && formik.errors.fullName ? (
            <span>{formik.errors.fullName}</span>
          ) : null}
        </div>

        <input
          name="fullName"
          type="text"
          placeholder="Tony Stark"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
          style={{
            border:
              formik.touched.fullName && formik.errors.fullName
                ? "1px solid red"
                : "1px solid #dedee0",
          }}
        ></input>
      </div>
  );
};

export default FullName;
