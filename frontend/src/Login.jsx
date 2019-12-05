import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col, FormGroup } from "reactstrap";

import { useLogin } from "./hooks/useLogin";
import { LOGIN } from "./reducers/auth";

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
      console.log("ComponentDidMount");
      return;
    }
    storeToken(response.data.token);
    history.push("/sports");

    console.log("useEffect", response.data.token);
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
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
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
    storeToken: token => dispatch({ type: LOGIN, payload: token })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
