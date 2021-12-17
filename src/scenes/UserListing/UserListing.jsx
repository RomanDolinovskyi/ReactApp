import React from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";

import { withRouter } from "react-router-dom";
import { usersOperations, usersSelectors } from "../../modules/users/users";
import UserListItems from "../../components/Home/UserListing/UserListings";
import { productsOperations } from "../../modules/products/products";

import Loader from "../../components/loader/loader";

const Product = ({ users, isLoading, products, toggleSaved, prodIsLoad }) => (
  <Loader {...{isLoading}}>
    <div>
      {users &&  (
        <UserListItems {...{ users, products, toggleSaved, isLoading: prodIsLoad }} />
      )}
    </div>
  </Loader>
);

function mapStateToProps(state, props) {
  return {
    users: usersSelectors.getUserById(state, props.match.params.id),
    isLoading: state.users.isLoading,
    products: state.products.userProduct.list.map(
      (i) => state.entities.products[i]
    ),
    prodIsLoad: state.products.userProduct.isLoading,
    user: state.viewer.user,
  };
}

const mapDispatchToProps = {
  fetchUser: usersOperations.fetchUser,
  fetchUserProducts: productsOperations.fetchUserProducts,
  toggleSaved: productsOperations.toggleSaved,
};

const enhancer = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    async componentDidMount() {
      this.props.fetchUser(this.props.match.params.id);

      await this.props.fetchUserProducts(
        this.props.match.params.id,
        !!this.props.user
      );
    },
  })
);

export default enhancer(Product);
