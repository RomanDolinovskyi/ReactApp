import { createSelector } from 'reselect';

const getMessagesEntities = (state, id) => state.entities.messages
const getChatId = (state, id) => id;

export const getMessages = createSelector(
    getMessagesEntities, 
    getChatId,
    (entities, id) => Object.keys(entities).filter((key) => +entities[key].chatId === +id).map(i => entities[i]).sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
)



const getMessage = (state, id) => state.entities.messages[id];

export const getLastMessage = createSelector(
    getMessage,
    (item) => item
)
