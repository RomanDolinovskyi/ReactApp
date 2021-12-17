import * as actions from "./viewerActions";
import * as Api from "./../../Api/Api";
import { utilsOperations } from "./../utils/utils";
import { normalize } from "normalizr";
import * as Schemas from './../../Api/Schemas';

export function fetchViewer() {
  return async function fetchViewerThunk(dispatch) {
    try {
      dispatch(actions.fetchViewer.start());

      const res = await Api.Viewer.fetchViewer();

      const { entities, result } = normalize(res.data, Schemas.User);

      dispatch(actions.fetchViewer.success({ entities, result }));
    } catch (err) {
      dispatch(actions.fetchViewer.error());
    }
  };
}

export function editViewer(fullName, phone = null, ava, location, ava_upl) {
  return async function editViewerThunk(dispatch) {
    try {
      dispatch(actions.edit.start());

      let avatar = ava;

      if (!!ava_upl) {
        avatar = await dispatch(utilsOperations.uploadImage(ava_upl));
      }

      const res = await Api.Viewer.editViewer({
        fullName,
        phone,
        avatar,
        location,
      });

      dispatch(actions.edit.success(res.data));
    } catch (err) {
      dispatch(actions.edit.error());
    }
  };
}

export function logout() {
  return function logoutThunk(dispatch) {
    dispatch(actions.logout());
    Api.Authentificaton.logout();
  };
}

export function setViewer(user) {
  return function setViewerThunk(dispatch) {
    dispatch(actions.setViewer(user));
  };
}
