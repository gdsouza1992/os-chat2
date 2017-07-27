
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

utils.makeConversationObject = (conversation) => {
    conversation.role = '';
    conversation.unread = 0;
    return conversation;
}

utils.isArray = function(a) {
    return (!!a) && (a.constructor === Array);
};

utils.filterOnlineUsers = function(users, clients) {

    const clientUsers = _.keyBy(clients, client => client.user.userId)
    const onlineUsers = users.filter((user) => {
        return (clientUsers[user.userId])
    })

    const onlineClients = onlineUsers.map((user) => {
        return clientUsers[user.userId]
    })

    return onlineClients;
}


module.exports = utils;