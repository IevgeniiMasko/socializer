import * as yup from "yup";

const formValidation = {
  register: yup.object().shape({
    username: yup.string().label("User name").min(2).max(40).required(),
    firstname: yup.string().label("First name").min(2).max(40).required(),
    lastname: yup.string().label("Last name").min(2).max(40).required(),
    password: yup.string().label("Password").min(8).max(40).required(),
    confirmPassword: yup
      .string()
      .label("Password")
      .min(8)
      .max(40)
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  }),

  login: yup.object().shape({
    username: yup.string().label("User name").min(2).max(40).required(),
    password: yup.string().label("Password").min(8).max(40).required(),
  }),
};

export default formValidation;
