import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { v4 as uuid } from "uuid";

import { useFormik } from "formik";

import EditForm from "./ProfileEditForm/ProfileEditForm";

// import s from "./WrapperProfileEdit.module.scss";
import Schema from "./ProfileEditValidationSchema";
import { withRouter } from "react-router-dom";
import routes from "../../../router/router";
import { viewerOperations } from "../../../modules/viewer/viewer";

const ProfileEdit = ({ isLoading, handleEdit, user }) => {
  const _id = uuid();
  const formik = useFormik({
    validationSchema: Schema,
    initialValues: {
      fullName: user.fullName,
      phone: user.phone || null,
      ava: user.avatar || null,
      ava_upl: null,
      location: user.location || null,
    },
    onSubmit({ fullName, phone, ava, location, ava_upl }, actions) {
      handleEdit(fullName, phone, ava, location, ava_upl, actions);
    },
  });

  return (
    <>
      <EditForm {...{ _id, formik, isLoading }} />
    </>
  );
};

function mapStateToProps(state) {
  return {
    isLoading: state.viewer.viewer.isLoading,
    user: state.viewer.user,
  };
}

const mapDispatchToProps = {
  edit: viewerOperations.editViewer,
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withHandlers({
    handleEdit: (props) => async (
      fullName,
      phone,
      ava,
      location,
      ava_upl,
      actions
    ) => {
      try {
        await props.edit(fullName, phone, ava, location, ava_upl);
        props.history.push(routes.HOME);
      } catch (err) {
        console.log(err);
        actions.setFieldError("phone", "Something went wrong");
      }
    },
  })
);

export default enhancer(ProfileEdit);
