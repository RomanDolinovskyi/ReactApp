import React from "react";
import { Route } from "react-router-dom";

import WrapperProfileEdit from "../../components/Profile/ProfileEdit/WrapperProfileEdit.jsx";

import routes from "../../router/router.js";
import { OnlyUsersRoute } from "../../router/privateRoute.jsx";
import ProfileEdit from "../../components/Profile/ProfileEdit/ProfileEdit.jsx";

const Profile = () => {
  return (
    <div id="profile-page">
      <WrapperProfileEdit>
        <OnlyUsersRoute>
          <Route path={routes.PROFILE_EDIT} component={ProfileEdit} />
        </OnlyUsersRoute>
      </WrapperProfileEdit>
    </div>
  );
};

export default Profile;
