import * as Yup from "yup";

const Schema = () => {
  const phoneRegExp = /^([1-9]{1})+([0-9]{11})$/;

  return Yup.object().shape({
    avatar: Yup.string().nullable(),
    fullName: Yup.string()
      .min(4, "Too short!")
      .max(50, "Too long!")
      .required("Required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .nullable()
      .max(12, "Phone number is not valid"),
    location: Yup.string().min(4, "Too short!").nullable(),
  });
};

export default Schema;
