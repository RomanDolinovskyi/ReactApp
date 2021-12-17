import React from "react";
import { Link } from "react-router-dom";
import { Icons, icon } from "../../../utils/icons";
import routes from "../../../router/router";

const SavedLink = ({ user, isSaved }) => {
  return (
    <div id="savedLink">
      {user && (
        <Link to={routes.SAVED}>
          {Icons(isSaved ? icon._savedIn : icon._savedOut, "20px")}
        </Link>
      )}
    </div>
  );
};

export default SavedLink;
