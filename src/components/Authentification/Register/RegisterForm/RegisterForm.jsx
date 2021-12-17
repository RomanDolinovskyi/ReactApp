import React from "react";

import Email from "../../../formComponents/emai.jsx";
import FullName from "../../../formComponents/fullName.jsx";
import Password from "../../../formComponents/password.jsx";
import { icon, Icons } from "../../../../utils/icons.jsx";

const RegisterForm = ({ _id1, _id2, formik, isLoading }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <legend>Register</legend>

      <Email {...{ formik }} type="email" />
      <FullName {...{ formik }} type="fullName" />
      <Password {...{ _id: _id1, formik }} type="password" title="Password" />
      <Password
        {...{ _id: _id2, formik }}
        type="repeatedPassword"
        title="Password Again"
      />
      <button type="submit">
        {isLoading ? Icons(icon._loader, "50px", "#f2f2f2") : "Continue"}
      </button>
    </form>
  );
};

export default RegisterForm;
