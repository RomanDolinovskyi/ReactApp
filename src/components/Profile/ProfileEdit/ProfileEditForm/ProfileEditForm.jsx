import React from "react";

import FullName from "../../../formComponents/fullName";
import Phone from "../../../formComponents/phone";
import Avatar from "../../../formComponents/avatar/avatar";
import Text from "../../../formComponents/text";

import { icon, Icons } from "../../../../utils/icons.jsx";

const EditForm = ({ formik, isLoading }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <legend>Edit profile</legend>

      <Avatar {...{ formik }} type="avatar" />
      <FullName {...{ formik }} type="fullName" />
      <Phone {...{ formik }} type="phone" />
      <Text {...{ formik }} type="location" placeholder="expl: Boston" />

      <button type="submit">
        {isLoading ? Icons(icon._loader, "50px", "#f2f2f2") : "Continue"}
      </button>
    </form>
  );
};

export default EditForm;
