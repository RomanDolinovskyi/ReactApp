import { createSelector } from "reselect";

const getChatsEntities = (state) => state.entities.chats;
const getChatsMessage = (state) => state.entities.messages;
const getChatsIds = (state) => state.chats.items;
const getUsers = (state) => state.entities.users;
const getProducts = (state) => state.entities.products;

export const getChats = createSelector(
  [getChatsEntities, getChatsMessage, getChatsIds, getUsers, getProducts],
  (entities, messages, ids, users, products) =>
    ids
      .map((i) => entities[i])
      .map((i) => ({
        ...i,
        message: messages[i.message],
      }))
      .map((i) => ({
        ...i,
        message: {
          ...i.message,
          owner: users[i.message.ownerId],
        },
      }))
      .map((i) => ({
        ...i,
        product: products[i.product]
      }))
      .map((i) => ({
        ...i,
        participants: users[i.participants]
      }))
);
