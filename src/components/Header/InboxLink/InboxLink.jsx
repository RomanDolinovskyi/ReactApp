import React from "react";
import { Icons, icon } from "../../../utils/icons";
import { Link } from "react-router-dom";
import routes from "../../../router/router";

const InboxLink = ({ user }) => {
  return (
    <div id="inboxLink">
      {user && <Link to={routes.INBOX}>{Icons(icon._inbox, "20px")}</Link>}
    </div>
  );
};

export default InboxLink;
