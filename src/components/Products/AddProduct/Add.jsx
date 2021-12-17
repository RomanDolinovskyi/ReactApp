import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { v4 as uuid } from "uuid";

import { useFormik } from "formik";

import AddForm from "./AddForm/AddForm";

import Schema from "./AddValidationSchema";
import { withRouter } from "react-router-dom";
import routes from "../../../router/router";
import { productsOperations } from "../../../modules/products/products";

const AddProduct = ({ isLoading, handleAdd }) => {
  const _id = uuid();
  const formik = useFormik({
    validationSchema: Schema,
    initialValues: {
      title: "",
      location: "",
      description: "",
      photos: [],
      price: "",
    },
    onSubmit({ title, location, description, photos, price }, actions) {
      photos = photos.map((el) => el[0] || null);

      handleAdd(title, location, description, photos, price, actions);
    },
  });

  return <AddForm {...{ _id, formik, isLoading }} />;
};

function mapStateToProps(state) {
  return {
    isLoading: state.products.addProduct.isLoading,
    user: state.viewer.user
  };
}

const mapDispatchToProps = {
  add: productsOperations.addProduct,
  fetchLatest: productsOperations.fetchLatest,
};

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withHandlers({
    handleAdd: (props) => async (
      title,
      location,
      description,
      photos,
      price,
      actions
    ) => {
      try {
        await props.add(title, location, description, photos, price);
        props.history.push(routes.HOME);
        await props.fetchLatest(!!props.user)
      } catch (err) {
        console.log(err);
        actions.setFieldError("price", "Something went wrong");
      }
    },
  })
);

export default enhancer(AddProduct);
