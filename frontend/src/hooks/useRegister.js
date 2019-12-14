import { useState } from "react";
import axios from "axios";

export function useRegister(initialState) {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [response, setResponse] = useState(null);

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (values.password === values.valPassword) {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:8000/register", {
          email: values.email,
          password: values.password
        });
        setResponse(res);
        setLoading(false);
      } catch (err) {
        setErrors(err);
        setLoading(false);
      }
    }
  };

  return {
    values,
    handleChange,
    handleSubmit,
    response,
    errors,
    loading
  };
}
