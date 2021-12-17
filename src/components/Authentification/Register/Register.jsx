import React from "react";
import { v4 as uuid } from "uuid";
import { useFormik } from "formik";

import RegisterForm from "./RegisterForm/RegisterForm";

import Schema from "./RegisterValidationSchema";

import s from "./../WrapperAuth.module.scss";
import { Link, withRouter } from "react-router-dom";
import routes from "../../../router/router";
import { authOperations } from "../../../modules/auth/auth";
import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";

const Register = ({ isLoading, handleRegister }) => {
  const _id1 = uuid();
  const _id2 = uuid();
  const formik = useFormik({
    validationSchema: Schema,
    initialValues: {
      email: "",
      fullName: "",
      password: "",
      repeatedPassword: "",
    },
    onSubmit({ email, fullName, password }, actions) {
      handleRegister(email, fullName, password, actions);
    },
  });
  return (
    <>
      <RegisterForm {...{ _id1, _id2, formik, isLoading }} />
      <div className={s.helpLink}>
        I already have an account,{" "}
        <Link to={routes.LOGIN}>
          <span>log in</span>
        </Link>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    isLoading: state.auth.register.isLoading,
  };
}

const mapDispatchToProps = {
  register: authOperations.register,
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withHandlers({
    handleRegister: (props) => async (email, password, fullName, actions) => {
      try {
        await props.register(email, fullName, password);
        props.history.push(routes.HOME);
      } catch (err) {
        actions.setFieldError("email", "Email already registered");
      }
    },
  })
);

export default enhancer(Register);
