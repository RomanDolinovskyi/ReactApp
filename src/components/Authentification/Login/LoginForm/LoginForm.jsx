import React from "react";

import Email from "../../../formComponents/emai.jsx";
import Password from "../../../formComponents/password.jsx";
import { Icons, icon } from "../../../../utils/icons.jsx";

const LoginForm = ({ _id, formik, isLoading }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <legend>Login</legend>

      <Email {...{ formik }} />
      <Password
        {...{ _id, formik }}
        type="password"
        title="Password"
        forgetPass="true"
      />

      <button type="submit">
        {isLoading ? Icons(icon._loader, "50px", "#f2f2f2") : "Continue"}
      </button>
    </form>
  );
};

export default LoginForm;
