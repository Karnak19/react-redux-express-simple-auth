import React, { useState } from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logOut } from "./store/actions";

function TheNavbar({ isAuth, logOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const [routes] = useState([
    { id: 1, label: "Home", requireAuth: false, link: "/" },
    { id: 2, label: "Sports", requireAuth: true, link: "/sports" }
  ]);
  return (
    <header>
      <Navbar color="light" light expand="md">
        <NavbarBrand>Reduc</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="mr-auto">
            {routes
              .filter(
                route => isAuth === route.requireAuth || !route.requireAuth
              )
              .map(route => {
                return (
                  <NavItem key={route.id}>
                    <NavLink tag={Link} to={route.link}>
                      {route.label}
                    </NavLink>
                  </NavItem>
                );
              })}
          </Nav>
          {!isAuth ? (
            <Button color="primary" tag={Link} to="/login">
              Log in
            </Button>
          ) : (
            <Button color="danger" onClick={logOut}>
              Log out
            </Button>
          )}
        </Collapse>
      </Navbar>
    </header>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut())
  };
};

const connectedNavbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(TheNavbar);

export default connectedNavbar;
