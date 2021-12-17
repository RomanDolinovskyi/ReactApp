import React from "react";
import { connect } from "react-redux";
import { lifecycle, compose } from "recompose";
import Loader from "../../loader/loader";
import { withRouter } from "react-router-dom";
import {
  productsSelectors,
  productsOperations,
} from "../../../modules/products/products";
import { usersOperations, usersSelectors } from "../../../modules/users/users";
import UserProduct from "./UserProduct/UserProduct";

const Product = ({
  product,
  productisLoading,
  user,
  userisLoading,
  toggleSaved,
  viewer
}) => {
  return (
  <Loader {...{ isLoading: productisLoading }}>
    {product && (
      <UserProduct {...{ product, user, userisLoading, toggleSaved, viewer }} />
    )}
  </Loader>

  )
}


function mapStateToProps(state, props) {
    return {
      product: productsSelectors.getProduct(state, props.match.params.id),
      user: usersSelectors.getUser(state, props.match.params.id),
      viewer: state.viewer.user,
      userisLoading: state.users.isLoading,
      productisLoading: state.products.getProduct.isLoading,
    };
}

const mapDispatchToProps = {
  toggleSaved: productsOperations.toggleSaved,
  getProduct: productsOperations.getProduct,
  fetchUser: usersOperations.fetchUser,
};

const enhancer = compose(
  lifecycle({
    async componentDidMount() {
      try {
        if (!this.props.product) {
          await this.props.getProduct(this.props.match.params.id);
          return;
        }
        if (!this.props.user) {
          await this.props.fetchUser(this.props.product.ownerId);
        }
      } catch (Err) {
        console.log(Err);
      }
    },
  })
);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(enhancer(Product))
);
