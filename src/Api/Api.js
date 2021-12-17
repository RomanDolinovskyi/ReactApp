import axios from "axios";

import Storage from "./storage";
import Socket from "./Socket";

export let _token = undefined;
export let user = null;

export const Authentificaton = {
  async login(email, password) {
    return await axios.post("/api/auth/login", {
      email,
      password,
    });
  },

  async register(email, password, fullName) {
    return await axios.post("/api/auth/register", {
      fullName,
      email,
      password,
    });
  },

  logout() {
    _token = null;
    user = null;
    Storage.removeToken();
    axios.defaults.headers.common["Authorization"] = undefined;
  },

  initialization() {
    try {
      let storeToken = Storage.getToken();
      if (!!storeToken) {
        this.initializeToken(storeToken);
      } else {
        throw new Error();
      }
    } catch (err) {
      throw new Error();
    }
  },

  initializeToken(token) {
    _token = token;
    Storage.setToken(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    Socket.init(token);
  },
};

export const Viewer = {
  async fetchViewer() {
  return await axios.get("/api/account");
  },

  async editViewer({ avatar, phone, location, fullName }) {
    return await axios.put("/api/account", {
      avatar,
      phone,
      location,
      fullName,
    });
  },

  async fetchUser(id) {
    return await axios.get(`/api/users/${id}`);
  },
};

export const Products = {
  async fetchLatest(from) {
    let url = "/api/products/latest";
    if (!!from) {
      url += `?from=${from}`;
    }
    return await axios.get(url);
  },
  async fetchSaved(from) {
    let url = "/api/products/saved";
    if (!!from) {
      url += `?from=${from}`;
    }
    return await axios.get(url);
  },
  async addToSaved(id) {
    return await axios.post(`/api/products/${id}/saved`);
  },
  async removeFromSaved(id) {
    return await axios.delete(`/api/products/${id}/saved`);
  },
  async addProduct(title, description, photos, location, price) {
    return await axios.post("/api/products", {
      title,
      description,
      photos,
      location,
      price,
    });
  },

  async getProduct(id) {
    return await axios.get(`/api/products/${id}`);
  },

  async searchProducts(query) { 
    if (!query) {
      return;
    }
    return await axios.get("/api/products/search?" + query);
  },
  async fetchUserProducts(id) {
    return await axios.get(`/api/users/${id}/products`);
  },
};

export const Chats = {
  async createChat(id, message) {
    return await axios.post(`/api/products/${id}/createChat`, { message });
  },
  async fetchChats() {
    return await axios.get(`/api/chats`);
  },
};

export const Messages = {
  async fetchMessages(id, from = null) {
    let query = `/api/chats/${id}/messages`;
    if (!!from) query = `/api/chats/${id}/messages?from=${from}`;
    return await axios.get(query);
  },
  async sendMessage(message, id) {
    return await axios.post(`/api/chats/${id}/messages`, { message });
  },
};

export const Upload = {
  async uploadImage(formData) {
    return await axios.post("/api/upload/images", formData);
  },
};
