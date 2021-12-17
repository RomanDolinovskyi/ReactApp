import React from "react";
import ImagePickerItem from "./imagePickerItem/imagePickerItem";

import {v4 as uuid} from 'uuid';

import s from "./imagePicker.module.scss";
import { Icons, icon } from "../../../utils/icons";

const ImagePicker = ({ formik }) => {

    function remove(id){
        let arr =  formik.values.photos;
        arr.splice(id, 1);
        formik.setFieldValue("photos", arr);
    }


  function handleAdd(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    let formData = new FormData();

    formData.append("image", file);

    reader.onloadend = () => {
      let res = reader.result;
      formik.setFieldValue("photos", [...formik.values.photos, [formData, res]]);
    };

    e.target.value = '';

  }

  return (
    <div id={s.ImagePicker}>
      <label>Photos</label>
      <div id={s.ImagePickerInputs}>
        {formik.values.photos.map((el, i) => {
          return <ImagePickerItem img={el[1]} id={i} key={uuid()} {...{remove}}/>;
        })}
        {formik.values.photos.length < 6 && <div id={s.addImage}>
          <label htmlFor='image'>{Icons(icon._plus, '70px')}</label>
          <input id='image' type="file" onChange={handleAdd} />
        </div>}
      </div>
    </div>
  );
};

export default ImagePicker;
