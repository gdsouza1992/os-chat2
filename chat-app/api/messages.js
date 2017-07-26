import axios from 'axios';
class Messages {

    getMessagesByConversation(data){
        // data : {conversationId}
        // console.log(data);
        const apiUrl = 'http://localhost:3002/api';
        // console.log('GET ' + apiUrl + '/message/' + data.conversationId);
        return axios.get(apiUrl + '/message/' + data.id);
    }

    addMessageToConversationByUserId(data){
        const apiUrl = 'http://localhost:3002/api';
        // console.log('POST ' + apiUrl + '/message/' + data.conversationId);
        return axios.post(apiUrl + '/message/' + data.conversation.id, {
            content: data.message,
            userId: data.user.userId
        });
    }
}

export default Messages;