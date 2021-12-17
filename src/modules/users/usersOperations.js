import * as Api from "../../Api/Api";
import * as actions from "./usersActions";
import { normalize } from "normalizr";
import * as Schemas from "../../Api/Schemas";

export function fetchUser(id) {
  return async function fetchUserThunk(dispatch) {
    try {
      dispatch(actions.fetchUser.start());

      let res = await Api.Viewer.fetchUser(id);

      const { result, entities } = normalize(res.data, Schemas.User);

      dispatch(actions.fetchUser.success({ result, entities }));
    } catch (err) {
      dispatch(actions.fetchUser.error());
    }
  };
}
