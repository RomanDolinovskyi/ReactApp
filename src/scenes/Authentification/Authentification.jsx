import React from "react";
import { Switch, Route } from "react-router-dom";

import WrapperAuth from "../../components/Authentification/WrapperAuth";
import Login from "../../components/Authentification/Login/Login.jsx";
import Register from "../../components/Authentification/Register/Register.jsx";
import Restore from "../../components/Authentification/Restore/Restore.jsx";
import routes from "../../router/router.js";

const Authentification = () => {
  return (
    <div id="auth-page">
      <WrapperAuth>
        <Switch>
          <Route path={routes.LOGIN} component={Login} />
          <Route path={routes.REGISTER} component={Register} />
          <Route path={routes.RESTORE} component={Restore} />
        </Switch>
      </WrapperAuth>
    </div>
  );
};

export default Authentification;
