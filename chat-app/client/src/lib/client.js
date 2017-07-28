import io from 'socket.io-client';
import { EventEmitter } from 'events';

const _ = require('lodash');
class Client extends EventEmitter {

    connect(){
        this.socket = io.connect('http://192.168.6.198:3001');
        // this.socket = io.connect('http://192.168.0.12:3001');

        this.socket.on('load-messages-server', (data) => {
            this.emit('load-messages',data);
        });

        this.socket.on('new-message-server', (data) => {
            this.emit('new-message',data);
        })

        this.socket.on('reset-unread-counts-server', (data) => {
            this.emit('reset-unread-counts', data);
        })

        this.socket.on('load-roster-server', (data) => {
            this.emit('load-roster', data);
        });

        this.socket.on('new-conversation-server', (data) => {
            this.emit('subscribe-new-conversation', data);
            this.emit('new-conversation', data);
        });

        this.socket.on('search-results-server', (data) => {
            this.emit('search-results', data);
        })

        this.socket.on('load-conversations-server', (data) => {
            this.emit('load-conversations', data);
        })

    }

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

    createNewConversation(data){
        this.socket.emit('new-conversation', data);
    }

    search(data){
        this.socket.emit('search-results', data);
    }

    attachUserToSocket(user){
        this.socket.emit('attach-user-client', user);
    }

    subscribeToNewConversation(conversation){
        this.socket.emit('subscribe-conversation', conversation);
    }

}

export default Client;

