const restApi = require('../api');
const utils = require('./utils');
const bot = require('./messageProcessor');

const _ = require('lodash');

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

            // client.on('subscribe', (data) => {
            //     room = data.room
            //     socket.join(room)
            //     console.log('joined room', room)
            // })

            // client.on('unsubscribe', () => { socket.leave(room)
            //     console.log('leaving room', room)
            // })

            client.on('attach-user-client', function(data){
                const clientObj = {}
                clientObj.user = data;
                clientObj.clientId = client.id;
                clients.push(clientObj);
            });

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

            client.on('subscribe-conversation', function(conversation){
                client.join(`conversation:${conversation.id}`);
            })
                                

            client.on('leave-conversation', function(data) {
                if(data.newAdmin){
                    // set the new user as admin and notify the group
                }
                GroupMembers.removeUserFromGroup(data)
                .then((response) => {
                    server.to(`conversation:${data.conversation.id}`).emit('leave-conversation-server', response.data);
                    res.json({messages : 'Removed user from group'})
                })
                .catch((err) => {
                    const error = {messages : 'Error in removing user', err}
                    server.emit('send-error-server', error);
                })
            })


            client.on('new-conversation', function(data){
                const {name, privacy, type, user, members} = data;

                const conversation = {
                    name,
                    privacy,
                    type
                }

                let newConversation = {};

                //Create new covnersation in DB
                Conversations.addNewConversation(conversation)
                .then((response) => {

                    //Add the creator to group
                    const conversationId = response.data.id;
                    newConversation = utils.makeConversationObject(response.data)
                    const groupMembers = [{ userId: user.userId, conversationId: conversationId, role:'admin' }];
                    
                    //get the array of founding members
                    const membersArr = utils.isArray(members) ? members : [members];

                    //make memberObjecsts from membersArr
                    _.forEach(membersArr, function(user) {
                        const newMember = {userId:user.value, conversationId:conversationId, role:'contributor'}
                        groupMembers.push(newMember);
                    });


                    if(response.status === 200){

                        //Add the members to the db
                        GroupMembers.addUsersToGroup(groupMembers, conversationId)
                        .then((response) => {

                            if(response.status === 200){
                                
                                const onlineClients = utils.filterOnlineUsers(groupMembers, clients);
                                _.forEach(onlineClients, function(onlineClient){
                                    server.to(onlineClient.clientId).emit('new-conversation-server', newConversation);
                                });
                            }
                        })
                        .catch((err) => {
                            const error = {messages : 'Error in getting search data', err}
                            server.emit('send-error-server', error);
                        })
                    }
                })
                .catch((err) => {
                    const error = {messages : 'Error in getting search data', err}
                    server.emit('send-error-server', error);
                })
            })

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