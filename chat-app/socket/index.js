const restApi = require('../api');
const utils = require('./utils');
const bot = require('./messageProcessor');

class Socket{

    constructor(socketio){
        this.io = socketio;
    }

    startChatServer(){
        const Conversations = new restApi.Conversations();
        const Messages = new restApi.Messages();
        const GroupMembers = new restApi.GroupMembers();
        const Search = new restApi.Search();
        console.log();

        let clients = []
        let rooms = []

        const server = this.io;

        server.on('connection',function(client) {
            console.info('Client connected (id=' + client.id + ').');
            clients.push(client);

            // client.on('subscribe', (data) => {
            //     room = data.room
            //     socket.join(room)
            //     console.log('joined room', room)
            // })

            // client.on('unsubscribe', () => { socket.leave(room)
            //     console.log('leaving room', room)
            // })

            client.on('load-conversations', function (data) {
                Conversations.getConversationsByUser(data)
                .then((response) => {
                    utils.addClientToRooms(client,response.data);
                    const results = utils.makeConversationObjects(response.data)

                    server.to(client.id).emit('load-conversations-server', results);
                })
                .catch((err) => {
                    const error = {messages : 'Error in getting conversations', err}
                    server.to(client.id).emit('send-error-server', error);
                })
            });

            client.on('load-roster', function(conversation){
                GroupMembers.getRosterData(conversation)
                .then((response) => {
                    // users = utils.createUserObjects(response.data);
                    const results = response.data;
                    server.to(client.id).emit('load-roster-server', results);
                })
                .catch((err) => {
                    const error = {messages : 'Error in getting room roster', err}
                    server.to(client.id).emit('send-error-server', error);
                })
            });

            client.on('load-messages', function(conversation){

                Messages.getMessagesByConversation(conversation)
                .then((response) => {
                    const results = response.data;
                    server.to(client.id).emit('load-messages-server', results);
                })
                .catch((err) => {
                    const error = {messages : 'Error in getting messages', err}
                    server.to(client.id).emit('send-error-server', error);
                })
            })

            client.on('send-message', function(data){
                //emit to conversation id the message
                Messages.addMessageToConversationByUserId(data)
                .then((response) => {
                    if(response.status === 200){
                        console.log(response.data);
                        const newMessage = response.data;
                        server.to(`conversation:${data.conversation.id}`).emit('new-message-server', newMessage);
                    } else {
                        server.emit('send-error-server', error);
                    }
                })
                .catch((err) => {
                    const error = {messages : 'Error in adding messages', err}
                    server.emit('send-error-server', error);
                })
            })

            client.on('reset-unread-counts', function(groupMemberData){
                GroupMembers.resetUnreadCount(groupMemberData)
                .then((response)=>{
                    const results = response.data;
                    console.log(results);
                    server.to(client.id).emit('reset-unread-counts-server',results);
                })
                .catch((err) => {
                    const error = {messages : 'Error in resetting conversation unread count', err}
                    server.emit('send-error-server', error);
                })
            });

            client.on('search-results', function(data){

                Search.getSearchData(data)
                .then((response) => {
                    const results = {results: response.data, filter: data.filter};
                    console.log(results);
                    server.to(client.id).emit('search-results-server',results);
                })
                .catch((err) => {
                    const error = {messages : 'Error in getting search data', err}
                    server.emit('send-error-server', error);
                })
            });

            // client.on('send-search-term-client', function(data){
            //     //Set the filter for users for roster controls
            //     data.filter = data.filter || 'users';
            //     Search.getSearchData(data)
            //     .then((response)=>{
            //         if(response.err){
            //             const error = 'Enter a search term'
            //             server.emit('send-error-server', error);
            //         } else {
            //             const results = {data: response.data, filter: data.filter};
            //             server.to(client.id).emit('send-search-data-server',results);
            //         }
            //     })
            //     .catch((err) => {
            //         const error = {messages : 'Error in getting search data', err}
            //         server.emit('send-error-server', error);
            //     });
            // });

            // client.on('send-add-user-to-group-client', function(data){
            //     // data  { userId: 5, conversationId: '3' }
            //     GroupMembers.addUserToGroup(data)
            //     .then((response) => {
            //         if(response.status === 200){
            //             const result = {
            //                 conversationId: data.conversationId,
            //                 user: response.data
            //             };

            //             bot.sendMessage(server, data.conversationId, 'addUserToGroup',result.user);
            //             server.to(`conversation:${data.conversationId}`).emit('send-update-roster-server', result);
            //         }
            //     })
            //     .catch((err) => {
            //         const error = {messages : 'Error in getting search data', err}
            //         server.emit('send-error-server', error);
            //     })
            // })

            // client.on('load-role-conversation-client', function(data) {
            //     // const data = {conversationId, userId};
            //     console.log(data);
            //     GroupMembers.getUserRole(data)
            //     .then((response) => {
            //         if(response.status === 200){
            //             const result = {
            //                 conversationId: data.conversationId,
            //                 userId: response.data.userId,
            //                 role: response.data.role
            //             };
            //             server.to(client.id).emit('send-user-conversation-role-server', result);
            //         }
            //     })
            //     .catch((err) => {
            //         console.log(err)
            //         const error = {messages : 'Error in getting user role data', err}
            //         server.emit('send-error-server', error);
            //     })

            // });


            // client.on('send-add-new-conversation-client', function(data){
            //     // const data = {
            //     //     conversation : {conversationName, conversationPrivacy, conversationType}
            //     //     userId : userId
            //     // };

            //     Conversations.addNewConversation(data.conversation)
            //     .then((response) => {
            //         console.log("Added a new conversation");
            //         //Add the creator to group
            //         const groupMember = { userId: data.userId, conversationId: response.data.id };
            //         if(response.status === 200){
            //             groupMember.role = 'admin';
            //             GroupMembers.addUserToGroup(groupMember)
            //             .then((response) => {
            //                 if(response.status === 200){

            //                     const result = {
            //                         conversationId: groupMember.conversationId,
            //                         user: response.data
            //                     };
            //                     console.log(result);
            //                     bot.sendMessage(server, result.conversationId, 'addUserToGroup',result.user);

            //                     const updateConversationUserId = {userId : result.user.id};
            //                     server.to(client.id).emit('send-conversation-list-updated-server', updateConversationUserId);

            //                 }
            //             })
            //         }
            //     })
            //     .catch((err) => {
            //         const error = {messages : 'Error in getting search data', err}
            //         server.emit('send-error-server', error);
            //     })
            // })

            client.on('disconnect', function(){
                var index = clients.indexOf(client);
                if (index != -1) {
                    clients.splice(index, 1);
                    console.info('Client disconnected (id=' + client.id + ').');
                }
            });

        });
    }

    
}




module.exports = Socket;