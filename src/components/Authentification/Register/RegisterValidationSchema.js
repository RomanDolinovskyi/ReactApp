import * as Yup from "yup";

const Schema = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    fullName: Yup.string()
      .min(4, "Too short!")
      .max(50, "Too long!")
      .required("Required"),
    password: Yup.string()
      .min(8, "Too short")
      .max(50, "Too long")
      .required("Required"),
    repeatedPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });
};

export default Schema;
