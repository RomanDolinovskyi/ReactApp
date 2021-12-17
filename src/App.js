import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import routes from "./router/router";

import Authentification from "./scenes/Authentification/Authentification.jsx";
import Home from "./scenes/Home/Home";

import "./App.module.scss";
import Header from "./components/Header/Header";
import { OnlyViewersRoute, OnlyUsersRoute } from "./router/privateRoute";
import Profile from "./scenes/Profile/Profile";
import AddProduct from "./scenes/AddProduct/AddProduct";
import Loader from "./components/loader/loader";
import Inbox from "./scenes/Inbox/Inbox";

function App({ isLoading }) {
  return (
    <BrowserRouter>
      <Header />
      <Loader {...{ isLoading }}>
        <Switch>
          <Route
            exact
            path={routes.DEFAULT}
            render={() => <Redirect to={routes.HOME} />}
          />
          <Route path={routes.HOME} component={Home} />
          <Route path={routes.PROFILE} component={Profile} />
          <Route
            path={routes.AUTHENTIFICATION}
            render={() => (
              <OnlyViewersRoute>
                <Authentification />
              </OnlyViewersRoute>
            )}
          />
          <Route
            path={routes.ADD_PRODUCT}
            render={() => (
              <OnlyUsersRoute>
                <AddProduct />
              </OnlyUsersRoute>
            )}
          />
        </Switch>
        <Route
          path={routes.INBOX}
          render={() => (
            <OnlyUsersRoute>
              <Inbox />
            </OnlyUsersRoute>
          )}
        />
      </Loader>
    </BrowserRouter>
  );
}

export default App;
