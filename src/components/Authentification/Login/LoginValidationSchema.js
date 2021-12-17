import * as Yup from "yup";

const Schema = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too short")
      .max(50, "Too long")
      .required("Required"),
  });
};

export default Schema;
