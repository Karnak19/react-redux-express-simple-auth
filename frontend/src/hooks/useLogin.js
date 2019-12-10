import { useState } from "react";
import axios from "axios";

export function useLogin(initialState) {
  const [values, setValues] = useState(initialState);
  const [response, setResponse] = useState(null);

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/login", values);
      setResponse(res);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    values,
    response,
    handleSubmit,
    handleChange
  };
}
