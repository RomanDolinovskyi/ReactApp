import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { v4 as uuid } from "uuid";

import { useFormik } from "formik";

import LoginForm from "./LoginForm/LoginForm";

import s from "./../WrapperAuth.module.scss";
import Schema from "./LoginValidationSchema";
import { Link, withRouter } from "react-router-dom";
import routes from "../../../router/router";
import { authOperations } from "../../../modules/auth/auth";

const Login = ({ isLoading, handleLogin }) => {
  const _id = uuid();
  const formik = useFormik({
    validationSchema: Schema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit({ email, password }, actions) {
      handleLogin(email, password, actions);
    },
  });

  return (
    <>
      <LoginForm {...{ _id, formik, isLoading }} />
      <div className={s.helpLink}>
        I have no account,{" "}
        <Link to={routes.REGISTER}>
          <span>register now</span>
        </Link>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    isLoading: state.auth.login.isLoading,
  };
}

const mapDispatchToProps = {
  login: authOperations.login,
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withHandlers({
    handleLogin: (props) => async (email, password, actions) => {
      try {
        await props.login(email, password);
        props.history.push(routes.HOME);
      } catch (err) {
        console.log(err);
        actions.setFieldError("password", "Incorrect password or email");
      }
    },
  })
);

export default enhancer(Login);
