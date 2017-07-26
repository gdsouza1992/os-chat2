
const _ = require('lodash');
const utils = {};

utils.addClientToRooms = (client,rooms) => {
    _.forEach(rooms, (roomData) => {
        client.join(`conversation:${roomData.conversation.id}`);
    })
    return;
}

utils.makeConversationObjects = (conversations) => {
    return conversations.map((conversation) => {
        const conversationObj = conversation.conversation;
        conversationObj.role = conversation.role;
        conversationObj.unread = conversation.unread;
        return conversationObj;
    })
}

// utils.getRoomsFromORM(rooms){

// }


module.exports = utils;