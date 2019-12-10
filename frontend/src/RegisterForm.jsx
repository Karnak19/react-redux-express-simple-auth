import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Input, Button, FormGroup } from "reactstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { useRegister } from "./hooks/useRegister";
import { storeToken } from "./store/actions";

function Register({ storeToken }) {
  const { values, handleChange, handleSubmit, response } = useRegister({
    email: "",
    password: "",
    valPassword: ""
  });
  const history = useHistory();

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    storeToken(response.data.token);
    history.push("/");
  }, [response]);

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

const mapDispatchToProps = dispatch => {
  return {
    storeToken: token => dispatch(storeToken(token))
  };
};

const connectedRegister = connect(
  null,
  mapDispatchToProps
)(Register);

export default connectedRegister;
