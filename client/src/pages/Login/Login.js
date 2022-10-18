import React from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

//store
import { loginUser } from "../../store/auth/actions";

//validation
import formValidation from "../../validation/formValidation";
import InputField from "../../components/InputField/InputField";

//hooks
import useFormSubmit from "../../hooks/useFormSubmit";

//styles
import "./styles.scss";

const LOGIN_URL = "/auth/login";

const Login = () => {
  const dispatch = useDispatch();

  const onSuccess = ({ data }) => {
    dispatch(loginUser(data.data));
  };

  const handleSubmit = useFormSubmit(LOGIN_URL, undefined, onSuccess);

  return (
    <div className="container">
      <div className="login">
        <h1 className="login__name">Log in</h1>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={formValidation.login}
        >
          <Form className="login__form">
            <Field
              type="text"
              name="username"
              label="User name"
              component={InputField}
            />
            <Field
              type="password"
              name="password"
              label="Password"
              component={InputField}
            />
            <button type="submit" className="login__btn">
              Log in
            </button>
          </Form>
        </Formik>
      </div>
      <p className="login-bottom">
        <span>Need an account?</span>
        <Link to={"/register"}>Register</Link>
      </p>
    </div>
  );
};

export default Login;
