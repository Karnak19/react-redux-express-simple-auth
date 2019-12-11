import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Input, Button, Row, Col, FormGroup } from "reactstrap";
import queryString from "query-string";

import { useLogin } from "./hooks/useLogin";
import { storeToken } from "./store/actions";

function LoginForm({ storeToken }) {
  const { values, response, handleChange, handleSubmit } = useLogin({
    email: "",
    password: ""
  });
  const history = useHistory();
  const location = useLocation();

  const firstRender = useRef(true);

  useEffect(() => {
    const { token } = queryString.parse(location.search);
    if (token) {
      storeToken(token);
      history.push("/");
    }
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    storeToken(response.data.token);

    history.push("/");
  }, [response]);

  return (
    <>
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
      <hr style={{ backgroundColor: "#444444" }} />
      <Row>
        <Col xs={{ size: 6, offset: 3 }}>
          <Button
            href="http://localhost:8000/login/auth/google"
            block
            color="danger"
          >
            Sign with Google
          </Button>
        </Col>
      </Row>
    </>
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
