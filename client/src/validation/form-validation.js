import validator from "validator";

export const validateEmail = date => {
  if (!validator.isEmail(data)) {
    return "Email is invalid";
  }
};
