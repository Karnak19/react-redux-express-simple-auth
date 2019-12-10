import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Home from "./Home";
import Sports from "./Sports";
import TheNavbar from "./Navbar";
import Login from "./Login";

function AuthRoute({ isAuth, component: Component, ...rest }) {
  return isAuth ? (
    <Route {...rest} render={props => <Component {...props} />} />
  ) : (
    <Redirect to="/" />
  );
}

function Router({ isAuth }) {
  return (
    <>
      <TheNavbar />
      <Route
        render={({ location }) => {
          return (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={450} classNames="fade">
                <Switch location={location}>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <AuthRoute
                    isAuth={isAuth}
                    path="/sports"
                    component={Sports}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth
  };
};

const connectedRouter = connect(mapStateToProps)(Router);

export default connectedRouter;
