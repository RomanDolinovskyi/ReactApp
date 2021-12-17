import { productsActions } from "../products/products";
import { messagesActions } from "../messages/messages";

const initialState = {
  products: {},
  users: {},
  chats: {},
  messages: {},
};

export default function entitiesReducer(state = initialState, action) {
  if (!!action.payload && !!action.payload.entities) {
    let entities = action.payload.entities;

    if (!!entities.users) {
      let keys = Object.keys(entities.users);
      keys.map((key) =>
        Object.assign(entities.users[key], {
          avatar: !!entities.users[key].avatar
            ? `url(${entities.users[key].avatar})`
            : "#" + Math.floor(Math.random() * 16777215).toString(16),
        })
      );
    }

    return Object.keys(entities).reduce(
      (acc, key) => {
        const entity = acc[key];

        acc[key] = Object.assign({}, entity, entities[key]);
        return acc;
      },
      {
        ...state,
      }
    );
  }

  if (
    action.type === productsActions.toggleSaved.start.toString() ||
    action.type === productsActions.toggleSaved.error.toString()
  ) {
    return {
      ...state,
      products: {
        ...state.products,
        [action.payload]: {
          ...state.products[action.payload],
          saved: !state.products[action.payload].saved,
        },
      },
    };
  }

  if (action.type === messagesActions.sendMessage.start.toString()) {
    return {
      ...state,
      messages: {
        ...state.messages,
        [action.payload.messageId]: action.payload.message,
      },
    };
  }
  if (action.type === messagesActions.sendMessage.error.toString()) {
    return {
      ...state,
      messages: {
        ...state.messages,
        [action.payload]: {
          ...state.messages[action.payload],
          isLoading: false,
          isError: true,
        },
      },
    };
  }
  return state;
}
