const changeView = (id) => {
  let input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
};

export default changeView;
