import React from "react";
import { Container, Row, Col, Form, Input, Button } from "reactstrap";

import { useRegister } from "./hooks/useRegister";

function Register() {
  const { values, handleChange, handleSubmit } = useRegister({
    email: "",
    password: "",
    valPassword: ""
  });
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <div>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="email"
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="password"
              />
            </div>
            <div>
              <Input
                type="password"
                name="valPassword"
                value={values.valPassword}
                onChange={handleChange}
                placeholder="confirm password"
              />
            </div>
            <div>
              <Button color="success" block type="submit">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
