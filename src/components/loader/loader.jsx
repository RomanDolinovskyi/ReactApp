import React from 'react';
import { Icons, icon } from '../../utils/icons';
import { v4 as uuid } from 'uuid';

import s from './loader.module.scss';

const Loader = ({isLoading, children, heigth, size, margin}) => {
    return isLoading ? <div key={uuid()} id={s.loader} style={{marginTop: `-${size}`    }}>{Icons(icon._loader, size || "100px", "#171236")}</div> : children || <div key={uuid()}></div>;
}

export default Loader;