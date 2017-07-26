import io from 'socket.io-client';
import { EventEmitter } from 'events';

const _ = require('lodash');
class Client extends EventEmitter {

    connect(){
        this.socket = io.connect('http://192.168.6.198:3001');

        this.socket.on('load-messages-server', (data) => {
            this.emit('load-messages',data);
        });



        this.socket.on('new-message-server', (data) => {
            this.emit('new-message',data);
        })

    //     this.socket.on('send-conversation-list-updated-server', (data) => {
    //         this.fetchConversations(data.userId);
    //     });

    //     this.socket.on('send-conversations-server', (data) => {
    //         this.emit('load-conversations-client-success', data);
    //     });

        this.socket.on('reset-unread-counts-server', (data) => {
            this.emit('reset-unread-counts', data);
        })

        this.socket.on('load-roster-server', (data) => {
            this.emit('load-roster', data);
        });

    //     this.socket.on('send-search-data-server', (data) => {
    //         this.emit('load-suggestions-search', data);
    //     })

    //     this.socket.on('send-update-roster-server', (data) => {
    //         this.emit('load-roster-updates', data);
    //     });

    //     this.socket.on('send-user-conversation-role-server', (data) => {
    //         this.emit('load-user-conversation-role', data);
    //     })

        this.socket.on('load-conversations-server', (data) => {
            this.emit('load-conversations', data);
        })

    }

    // resetUnreadCounts(userId,conversationId){
    //     const data = {userId, conversationId};
    //     this.socket.emit('send-reset-unread-count-client', data);
    // }

    getConversations(data){
        if(_.isEmpty(data)){
            return;
        }
        this.socket.emit('load-conversations', data);
    }

    getMessages(data){
        if(_.isEmpty(data)){
            return;
        }
        this.socket.emit('load-messages', data);
    }

    getRoster(data){
        if(_.isEmpty(data)){
            return;
        }
        this.socket.emit('load-roster', data);
    }

    sendMessage(data){
        this.socket.emit('send-message', data)
    }

    resetUnreadCounts(activeConversation, activeUser){
        const data = {
            conversation: activeConversation,
            user: activeUser
        }
        this.socket.emit('reset-unread-counts', data)
    }

    // fetchRoster(conversationId){
    //     const data = {conversationId};
    //     this.socket.emit('load-conversation-roster-client', data);
    // }

    // fetchUserRoleForConversation(conversationId, userId){
    //     console.log("CalledfetchUserRoleForConversation");
    //     const data = {conversationId, userId};
    //     console.log(data)
    //     this.socket.emit('load-role-conversation-client', data);
    // }

    // sendMessage(userId, conversationId, message){
    //     const data = {userId, conversationId, message};
    //     this.socket.emit('send-message-client', data);
    // }

    // search(term, filterType){
    //     const data = {term: term, filter: filterType};
    //     this.socket.emit('send-search-term-client', data);
    // }

    // addUserToGroup(userId, conversationId){
    //     const data = {userId, conversationId, };
    //     this.socket.emit('send-add-user-to-group-client', data);
    // }

    // addNewConversation(conversationName, conversationPrivacy, conversationType, userId){
    //     const data = {
    //         conversation : {conversationName, conversationPrivacy, conversationType},
    //         userId : userId
    //     };
    //     this.socket.emit('send-add-new-conversation-client', data);
    // }


}

export default Client;

