const Storage = {
  getToken() {
    return window.localStorage.getItem("_token");
  },
  setToken(token) {
    window.localStorage.setItem("_token", token);
  },
  removeToken() {
    window.localStorage.removeItem("_token");
  },
  getRecentSearch() {
    return JSON.parse(window.localStorage.getItem("recentSearch"));
  },
  setSearch(item) {
    if (!item) return;

    let store = JSON.parse(window.localStorage.getItem("recentSearch"));

    if (!window.localStorage.getItem("recentSearch")) {
      window.localStorage.setItem("recentSearch", JSON.stringify([item]));
    } else {
      store = store.filter((el) => el !== item);
      store.unshift(item);

      window.localStorage.setItem("recentSearch", JSON.stringify(store));
    }
  },
  removeRecentSearch() {
    window.localStorage.removeItem("recentSearch");
  },
};

export default Storage;
