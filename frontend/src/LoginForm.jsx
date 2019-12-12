import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  FormGroup,
  Container
} from "reactstrap";
import queryString from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";

import { useLogin } from "./hooks/useLogin";
import { storeToken } from "./store/actions";

function LoginForm({ storeToken }) {
  const { values, response, handleChange, handleSubmit } = useLogin({
    email: "",
    password: ""
  });
  const history = useHistory();
  const location = useLocation();

  const oAuthProviders = [
    {
      id: 1,
      label: "Google",
      color: "danger",
      link: "http://localhost:8000/login/auth/google",
      icon: faGoogle
    },
    {
      id: 2,
      label: "Github",
      color: "secondary",
      link: "http://localhost:8000/login/auth/github",
      icon: faGithub
    },
    {
      id: 3,
      label: "Facebook",
      color: "primary",
      link: "http://localhost:8000/login/auth/facebook",
      icon: faFacebook
    }
  ];

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
    <Container>
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
        {oAuthProviders.map(provider => {
          return (
            <Col xs={{ size: 6, offset: 3 }} className="my-2">
              <Button href={provider.link} block color={provider.color}>
                <FontAwesomeIcon icon={provider.icon} className="mr-1" />
                Sign with {provider.label}
              </Button>
            </Col>
          );
        })}
      </Row>
    </Container>
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
