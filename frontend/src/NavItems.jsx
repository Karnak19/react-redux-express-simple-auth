import React from "react";
import { NavItem, NavLink } from "reactstrap";

function NavItems({ activeTab, id, label, toggle }) {
  return (
    <NavItem key={id}>
      <NavLink active={activeTab === id} onClick={() => toggle(id)}>
        {label}
      </NavLink>
    </NavItem>
  );
}

export default NavItems;
