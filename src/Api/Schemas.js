import { schema } from "normalizr";

//Users

export const User = new schema.Entity("users");

//Products

export const Product = new schema.Entity("products", {
  owner: User,
});
export const ProductList = [Product];

//Chats

export const Message = new schema.Entity("messages")

export const Chat = new schema.Entity("chats", {
    message: Message,
    product: Product,
    participants: [User]
})

export const ChatsList = [Chat];

export const MessagesList = [Message];