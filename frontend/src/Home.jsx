import React from "react";
import { Container } from "reactstrap";

import Register from "./Register";
import Login from "./Login";

function Home() {
  return (
    <Container>
      <Register />
      <Login />
    </Container>
  );
}

export default Home;
