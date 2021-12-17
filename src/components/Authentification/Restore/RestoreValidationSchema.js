import * as Yup from "yup";

const Schema = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
};

export default Schema;
