import * as actions from "./authActions";
import * as Api from "./../../Api/Api";
import { viewerOperations } from "../viewer/viewer";
import { normalize } from "normalizr";
import * as Schemas from "./../../Api/Schemas";

export function login(email, password) {
  return async function loginThunk(dispatch) {
    try {
      dispatch(actions.login.start());

      const res = await Api.Authentificaton.login(email, password);

      const { user, token } = res.data;

      Api.Authentificaton.initializeToken(token);

      const { entities, result } = normalize(user, Schemas.User);

      dispatch(
        viewerOperations.setViewer(
          Object.keys(entities.users).map((key) =>
            Object.assign(entities.users[key], {
              avatar: !!entities.users[key].avatar
                ? `url(${entities.users[key].avatar})`
                : "#" + Math.floor(Math.random() * 16777215).toString(16),
            })
          )[0]
        )
      );

      dispatch(actions.login.success({ entities, result }));
    } catch (err) {
      console.log(err);
      dispatch(actions.login.error({ message: err.message }));
      throw new Error();
    }
  };
}

export function register(email, fullName, password) {
  return async function registerThunk(dispatch) {
    try {
      dispatch(actions.register.start());

      const res = await Api.Authentificaton.register(email, fullName, password);

      const { user, token } = res.data;

      Api.Authentificaton.initializeToken(token);

      const { entities, result } = normalize(user, Schemas.User);

      dispatch(
        viewerOperations.setViewer(
          Object.keys(entities.users).map((key) =>
            Object.assign(entities.users[key], {
              avatar: !!entities.users[key].avatar
                ? `url(${entities.users[key].avatar})`
                : "#" + Math.floor(Math.random() * 16777215).toString(16),
            })
          )[0]
        )
      );

      dispatch(actions.register.success({ entities, result }));
    } catch (err) {
      dispatch(actions.register.error({ message: err.message }));
      throw new Error();
    }
  };
}
export function restore(email) {
  return async function restoreThunk(dispatch) {
    try {
      dispatch(actions.restore.start());

      await new Promise((res) =>
        setTimeout(() => {
          res();
        }, 2000)
      );

      dispatch(actions.restore.success());
    } catch (err) {
      dispatch(actions.restore.error({ message: err.message }));
      throw new Error();
    }
  };
}
