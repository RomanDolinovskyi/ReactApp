import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MemoryRouter } from "react-router";

import Login from "../components/Authentification/Login/Login";
import Register from "../components/Authentification/Register/Register";

const FormStories = storiesOf("Forms", module);

FormStories.addDecorator((story) => (
  <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
));

FormStories.add("Login", () => {
  return <Login onClick={action("click")} />;
});

FormStories.add("Register", () => {
  return <Register />;
});
