import React, { useState } from "react";
import axios from "axios";

export function useRegister(initialState) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(null);

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (values.password === values.valPassword) {
      try {
        const res = await axios.post("http://localhost:8000/register", {
          email: values.email,
          password: values.password
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return {
    values,
    handleChange,
    handleSubmit
  };
}
