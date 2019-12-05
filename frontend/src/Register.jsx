import React from "react";
import { Row, Col, Form, Input, Button, FormGroup } from "reactstrap";

import { useRegister } from "./hooks/useRegister";

function Register() {
  const { values, handleChange, handleSubmit } = useRegister({
    email: "",
    password: "",
    valPassword: ""
  });
  return (
    <Row>
      <Col xs={{ offset: 3, size: 6 }}>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="email"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="password"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="valPassword"
              value={values.valPassword}
              onChange={handleChange}
              placeholder="confirm password"
            />
          </FormGroup>
          <FormGroup>
            <Button color="success" block type="submit">
              Register
            </Button>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
}

export default Register;
