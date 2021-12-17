import * as Yup from "yup";

const Schema = () => {
  return Yup.object().shape({
    title: Yup.string()
      .required("Required")
      .min(8, "Too short")
      .max(20, "Too long"),
    location: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    photos: Yup.array(),
    price: Yup.number().required("Required"),
  });
};

export default Schema;
