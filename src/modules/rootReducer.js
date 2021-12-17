import { combineReducers } from "redux";
import app from "./app/app";
import auth from "./auth/auth";
import viewer from "./viewer/viewer";
import products from './products/products';
import search from './search/search';
import users from './users/users';
import chats from './chats/chats';
import messages from './messages/messages';

import entities from './entities/entities';

export default combineReducers({
  app,
  auth,
  viewer,
  products,
  search,
  users,
  chats,
  messages,
  entities,
  
});
