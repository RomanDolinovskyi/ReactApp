import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";

import { useFormik } from "formik";

// import s from "./../WrapperAuth.module.scss";
import Schema from "./RestoreValidationSchema";
import { withRouter } from "react-router-dom";
import routes from "../../../router/router";
import { authOperations } from "../../../modules/auth/auth";
import RestoreForm from "./RestoreForm/RestoreForm";
const Restore = ({ isLoading, handleRestore }) => {
  const formik = useFormik({
    validationSchema: Schema,
    initialValues: {
      email: "",
    },
    onSubmit({ email }, actions) {
      handleRestore(email, actions);
    },
  });

  return <RestoreForm {...{ formik, isLoading }} />;
};

function mapStateToProps(state) {
  return {
    isLoading: state.auth.restore.isLoading,
  };
}

const mapDispatchToProps = {
  restore: authOperations.restore,
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withHandlers({
    handleRestore: (props) => async (email, actions) => {
      try {
        await props.restore(email);
        props.history.push(routes.HOME);
      } catch (err) {
        console.log(err);
        actions.setFieldError("email", "Email not found");
      }
    },
  })
);

export default enhancer(Restore);
