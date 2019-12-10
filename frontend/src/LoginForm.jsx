import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col, FormGroup } from "reactstrap";

import { useLogin } from "./hooks/useLogin";
import { storeToken } from "./store/actions";
function LoginForm({ storeToken }) {
  const { values, response, handleChange, handleSubmit } = useLogin({
    email: "",
    password: ""
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
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </FormGroup>
          <FormGroup>
            <Button color="success" block type="submit">
              Login
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

const connectedLoginForm = connect(
  null,
  mapDispatchToProps
)(LoginForm);

export default connectedLoginForm;
