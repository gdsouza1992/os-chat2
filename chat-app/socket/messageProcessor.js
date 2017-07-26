const restApi = require('../api');
const _ = require('lodash');
const processor = {};

processor.userJoinRoom = (user,conversation) => {
    const verb = 'joined';
    const message = `${user.username} ${verb} the room.`;
    return message;
}

processor.userAddedToRoom = (user,conversation) => {
    const verb = ' has been added to';
    const message = `${user.username} ${verb} the room.`;
    return message;
}

processor.userLeaveRoom = (user,conversation) => {
    const verb = 'left';
    const message = `${user.username} ${verb} the room.`;
    return message;
}

processor.userRemovedFromRoom = (user,conversation) => {
    const verb = 'has been removed from ';
    const message = `${user.username} ${verb} the room`;
    return message;
}


processor.sendMessage = (server, conversationId, messageType, user) => {

    let content = ''
    const Messages = new restApi.Messages();

    switch (messageType){
        case "addUserToGroup":
            content = processor.userAddedToRoom(user, conversationId);
            break;

        default:
            console.log('Hit default')
            break;
    }

    console.log("Adding bot messsage");
    // data = { userId: '1', conversationId: '2', message: 'Test' }

    if(content === ''){
        return;
    }

    const data = { userId: 0, conversationId: conversationId, message: content }
    console.log(data);
    Messages.addMessageToConversationByUserId(data)
    .then((response) => {
        //sender is bot
        const results = {
            messagesData : response.data, 
            messageStatus: response.status, 
            isNew: true, 
            conversationId: conversationId, 
            sender: 0
        }
        server.to(`conversation:${conversationId}`).emit('send-new-messages-server', results);
    })
    .catch((err) => {
        console.log("error");
    });
    
}

module.exports = processor;