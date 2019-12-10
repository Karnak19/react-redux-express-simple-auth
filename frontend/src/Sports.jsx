import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";

function Sports({ token }) {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    const fetchSports = async () => {
      const res = await axios.get("http://localhost:8000/sports", {
        headers: {
          token
        }
      });
      setSports(res.data);
    };
    fetchSports();
  }, []);

  return (
    <Container className="page">
      <Row>
        {sports.map(sport => {
          return <Col>{sport}</Col>;
        })}
      </Row>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(Sports);
