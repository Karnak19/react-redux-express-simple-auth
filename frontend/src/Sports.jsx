import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Sports({ token }) {
  const [sports, setSports] = useState([]);
  const history = useHistory();

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
    <div>
      {sports.map(sport => {
        return <p>{sport}</p>;
      })}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(Sports);
