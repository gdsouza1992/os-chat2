import io from 'socket.io-client';
import { EventEmitter } from 'events';

class Client extends EventEmitter {

    connect(){
        this.socket = io.connect('http://192.168.6.198:3001');

        this.socket.on('send-messages-server', (data) => {
            this.emit('load-messages-client-success',data);
        });

        this.socket.on('send-new-messages-server', (data) => {
            this.emit('load-new-messages-client-success',data);
        })

        this.socket.on('send-conversation-list-updated-server', (data) => {
            this.fetchConversations(data.userId);
        });

        this.socket.on('send-conversations-server', (data) => {
            this.emit('load-conversations-client-success', data);
        });

        this.socket.on('send-reset-unread-count-server', (data) => {
            this.emit('load-conversation-unread-counts', data);
        })

        this.socket.on('send-conversations-roster-server', (data) => {
            this.emit('load-conversations-roster-server', data);
        });

        this.socket.on('send-search-data-server', (data) => {
            this.emit('load-suggestions-search', data);
        })

        this.socket.on('send-update-roster-server', (data) => {
            this.emit('load-roster-updates', data);
        });

        this.socket.on('send-user-conversation-role-server', (data) => {
            this.emit('load-user-conversation-role', data);
        })
    }

    resetUnreadCounts(userId,conversationId){
        const data = {userId, conversationId};
        this.socket.emit('send-reset-unread-count-client', data);
    }

    fetchConversations(userId){
        const data = {userId};
        this.socket.emit('load-conversations-client', data);
    }

    fetchMessages(userId = 1, conversationId){
        const data = {userId, conversationId};
        this.socket.emit('load-messages-client', data);
    }

    fetchRoster(conversationId){
        const data = {conversationId};
        this.socket.emit('load-conversation-roster-client', data);
    }

    fetchUserRoleForConversation(conversationId, userId){
        console.log("CalledfetchUserRoleForConversation");
        const data = {conversationId, userId};
        console.log(data)
        this.socket.emit('load-role-conversation-client', data);
    }

    sendMessage(userId, conversationId, message){
        const data = {userId, conversationId, message};
        this.socket.emit('send-message-client', data);
    }

    search(term, filterType){
        const data = {term: term, filter: filterType};
        this.socket.emit('send-search-term-client', data);
    }

    addUserToGroup(userId, conversationId){
        const data = {userId, conversationId, };
        this.socket.emit('send-add-user-to-group-client', data);
    }

    addNewConversation(conversationName, conversationPrivacy, conversationType, userId){
        const data = {
            conversation : {conversationName, conversationPrivacy, conversationType},
            userId : userId
        };
        this.socket.emit('send-add-new-conversation-client', data);
    }


}

export default Client;

