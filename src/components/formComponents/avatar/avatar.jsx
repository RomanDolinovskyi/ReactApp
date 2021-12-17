import React, { useState, useEffect } from "react";

import s from "./avatar.module.scss";

const Avatar = ({ formik }) => {
  const [image, previewImage] = useState("");

  let [firstName, secondName] = formik.values.fullName.split(" ");

  useEffect(() => {
    previewImage(formik.values.ava);
  }, [formik.values.ava]);

  function handleChange(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      let res = reader.result;
      formik.setFieldValue("ava", `url(${res})`);
    };

    let formData = new FormData();

    formData.append("image", e.target.files[0]);

    formik.setFieldValue("ava_upl", formData);
  }

  return (
    <div id={s.avatar_container}>
      <div>
        <label htmlFor="avatar-select">
          {!!image ? (
            <div id={s.img} style={{ backgroundImage: image }} />
          ) : (
            <div id={s.user_name}>
              {secondName && secondName[0] !== ("" || undefined)
                ? firstName[0].toUpperCase() + secondName[0].toUpperCase()
                : firstName && firstName[0] !== ("" || undefined)
                ? firstName[0].toUpperCase()
                : null}
            </div>
          )}
          <div id={s.upgrade_button}>Upgrage photo</div>
        </label>
      </div>

      <input
        id="avatar-select"
        name="avatar"
        type="file"
        onChange={handleChange}
        onBlur={formik.handleBlur}
        style={{
          border:
            formik.touched.avatar && formik.errors.avatar
              ? "1px solid red"
              : "1px solid #dedee0",
        }}
      ></input>
    </div>
  );
};

export default Avatar;
