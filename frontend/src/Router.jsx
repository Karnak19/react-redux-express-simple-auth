import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./Home";
import Sports from "./Sports";

function AuthRoute({ isAuth, component: Component, ...rest }) {
  return isAuth ? (
    <Route {...rest} render={props => <Component {...props} />} />
  ) : (
    <Redirect to="/" />
  );
}

function Router({ isAuth }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <AuthRoute isAuth={isAuth} path="/sports" component={Sports} />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth
  };
};

export default connect(mapStateToProps)(Router);
