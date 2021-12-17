import React from 'react';

import s from './imagePickerItem.module.scss'

const ImagePickerItem = ({ id, img, remove }) => {
    return(
        <div id={id} className={s.formImg} style={{backgroundImage: `url(${img})`}}>
            <div className={s.delete} onClick={() => remove(id)}> - </div>
        </div>
    )
}

export default ImagePickerItem;