import React, { useState } from "react";
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent
} from "reactstrap";

import Register from "./Register";
import Login from "./Login";

function Home() {
  const [activeTab, setActiveTab] = useState(1);
  const [tabs] = useState([
    { id: 1, label: "Login", component: <Login /> },
    { id: 2, label: "Register", component: <Register /> }
  ]);

  const toggleTab = tab => {
    activeTab !== tab && setActiveTab(tab);
  };

  return (
    <Container className="mt-5">
      <Nav tabs>
        {tabs.map(tab => {
          return (
            <NavItem key={tab.id}>
              <NavLink
                active={activeTab === tab.id}
                onClick={() => toggleTab(tab.id)}
              >
                {tab.label}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
      <TabContent activeTab={activeTab} className="mt-5">
        {tabs.map(tab => {
          return (
            <TabPane tabId={tab.id} key={tab.id}>
              {tab.component}
            </TabPane>
          );
        })}
      </TabContent>
    </Container>
  );
}

export default Home;
