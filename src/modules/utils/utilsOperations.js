import * as actions from "./utilsActions";
import * as Api from "./../../Api/Api";

export function uploadImage(formData) {
  return async function uploadImageThunk(dispatch) {
    try {
      dispatch(actions.uploadImage.start());

      let res = await Api.Upload.uploadImage(formData);

      dispatch(actions.uploadImage.success());

      return res.data;
    } catch (err) {
      dispatch(actions.uploadImage.error());
    }
  };
}
