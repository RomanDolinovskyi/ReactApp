import React from "react";

import Email from "../../../formComponents/emai.jsx";

import { icon, Icons } from "../../../../utils/icons.jsx";

const RestoreForm = ({ formik, isLoading }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <legend>Restore</legend>

      <Email {...{ formik }} type="email" />

      <button type="submit">
        {isLoading ? Icons(icon._loader, "50px", "#f2f2f2") : "Continue"}
      </button>
    </form>
  );
};

export default RestoreForm;
