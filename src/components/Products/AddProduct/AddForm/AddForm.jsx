import React from "react";

import s from "./AddForm.module.scss";

import { Icons, icon } from "../../../../utils/icons.jsx";
import ProductText from "../../../formComponents/productText/productText.jsx";
import ProductTextArea from "../../../formComponents/productText/productTextArea";

import ImagePicker from "../../../formComponents/imagePicker/imagePicker";

const LoginForm = ({ formik, isLoading }) => {
  return (
    <form onSubmit={formik.handleSubmit} id={s.addProductForm}>
      <legend>Add Product</legend>

      <ProductText
        title="title"
        isRequired="true"
        formik={formik}
        placeholder="For example: Iron Man Suit"
      />
      <ProductText
        title="location"
        isRequired="true"
        formik={formik}
        placeholder="For example: Los Angeles, CA"
      />
      <ProductTextArea
        title="description"
        formik={formik}
        isRequired="true"
        height={"183px"}
        type="textfield"
        placeholder="For example: Iron Man Suit"
      />
      <ImagePicker formik={formik} />
      <ProductText
        title="price"
        isRequired="true"
        formik={formik}
        type="number"
        placeholder="Price in $(USD)"
      />
      <div id={s.submitWrap}>
        <button type="submit">
          {isLoading ? Icons(icon._loader, "50px", "#f2f2f2") : "Continue"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
