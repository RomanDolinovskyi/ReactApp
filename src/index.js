import React from "react";
import ReactDOM from "react-dom";
import { store } from "./strore/createStore";
import { Provider, connect } from "react-redux";
import App from "./App";
import { compose, lifecycle } from "recompose";

import { appOperations } from "./modules/app/app";

function mapStateToProps(state) {
  return {
    isLoading: state.app.isLoading,
    viewer: state.viewer.viewer.isLoading,
  };
}

const ConnectedApp = compose(
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      this.props.dispatch(appOperations.init());
    },
  })
)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("root")
);
