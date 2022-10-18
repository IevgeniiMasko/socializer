import React from "react";
import { Formik, Form, Field, useNavigate } from "formik";
import { Link } from "react-router-dom";

//api
import axios from "../../api/axios";

//hooks
import useFormSubmit from "../../hooks/useFormSubmit";

//validation
import formValidation from "../../validation/formValidation";
import InputField from "../../components/InputField/InputField";

//styles
import "./styles.scss";

const REGISTER_URL = "/auth/register";
const LOGIN_NAVIGATION = "/";

const Register = () => {
  const handleSubmit = useFormSubmit(REGISTER_URL, LOGIN_NAVIGATION);

  return (
    <div className="container">
      <div className="register">
        <h1 className="register__name">Register</h1>
        <Formik
          initialValues={{
            username: "",
            firstname: "",
            lastname: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={formValidation.register}
        >
          <Form className="register__form">
            <Field
              type="text"
              name="username"
              label="User name"
              component={InputField}
            />
            <Field
              type="text"
              name="firstname"
              label="First name"
              component={InputField}
            />
            <Field
              type="text"
              name="lastname"
              label="Last name"
              component={InputField}
            />
            <Field
              type="password"
              name="password"
              label="Password"
              component={InputField}
            />
            <Field
              type="password"
              name="confirmPassword"
              label="Confirm password"
              component={InputField}
            />
            <button type="submit" className="register__btn">
              Register
            </button>
          </Form>
        </Formik>
      </div>
      <p className="register-bottom">
        <span>Already have an account?</span>
        <Link to={"/"}>Login</Link>
      </p>
    </div>
  );
};

export default Register;
