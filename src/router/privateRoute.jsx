import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import routes from "./router";
import { Redirect } from "react-router";

const onlyViewers = (props) => {
  return props.user ? <Redirect to={routes.HOME} /> : props.children;
};

const onlyUsers = (props) => {
  return !props.user ? <Redirect to={routes.LOGIN} /> : props.children;
};

function mapStateToProps(state) {
  return {
    user: !!state.viewer.user,
  };
}

const enhancer = compose(connect(mapStateToProps, undefined));

export const OnlyViewersRoute = enhancer(onlyViewers);
export const OnlyUsersRoute = enhancer(onlyUsers);
