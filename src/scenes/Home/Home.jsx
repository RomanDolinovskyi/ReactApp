import React from "react";
import { Switch, Route, useLocation } from "react-router";
import { compose } from "recompose";
import { connect } from "react-redux";
import { productsOperations } from "./../../modules/products/products";

import routes from "../../router/router";

import LatestProducts from "../../components/Home/LatestProducts/LatestProducts";
import SavedProducts from "../../components/Home/SavedProducts/SavedProducts";
import Product from "../../components/Home/Product/Product";
import UserListing from "../UserListing/UserListing";
import Modal from "../../components/Modal/Modal";
import CreateChat from "../../components/Home/CreateChat/CreateChat";
import { OnlyUsersRoute } from "../../router/privateRoute";

const Home = ({ toggleSaved }) => {

  const location = useLocation();

  const product = location.data && location.data.product;
  const chat = location.data && location.data.chat;

  return (
    <>
      {!!chat && (
        <Route
          path={routes.MODAL_CHAT}
          render={() => (
            <Modal>
              <OnlyUsersRoute>
              <CreateChat />
              </OnlyUsersRoute>
            </Modal>
          )}
        />
      )}
      {!!product && (
        <Route
          path={routes.PRODUCT}
          render={() => (
            <Modal>
              <Product />
            </Modal>
          )}
        />
      )}
      <Switch location={product || chat || location}>
        <Route
          exact
          path={routes.HOME}
          render={() => (
            <LatestProducts
              {...{
                toggleSaved,
              }}
            />
          )}
        />
        <Route
          path={routes.SAVED}
          render={() => (
            <OnlyUsersRoute>
            <SavedProducts
              {...{
                toggleSaved,
              }}
            />
            </OnlyUsersRoute>
          )}
        />
        <Route path={routes.PRODUCT} component={Product} />
        <Route path={routes.USER} component={UserListing} />
        <Route path={routes.MODAL_CHAT} render={() => <OnlyUsersRoute><CreateChat /></OnlyUsersRoute>} />
      </Switch>
    </>
  );
};

const mapDispatchToProps = {
  toggleSaved: productsOperations.toggleSaved,
};

const enhancer = compose(connect(undefined, mapDispatchToProps));

export default enhancer(Home);
