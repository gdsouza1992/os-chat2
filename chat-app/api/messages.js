import axios from 'axios';
class Messages {

    getMessagesByConversation(data){
        // data : {conversationId}
        // console.log(data);
        const apiUrl = 'http://localhost:3002/api';
        // console.log('GET ' + apiUrl + '/message/' + data.conversationId);
        return axios.get(apiUrl + '/message/' + data.conversationId);
    }

    addMessageToConversationByUserId(data){
        const apiUrl = 'http://localhost:3002/api';
        // console.log('POST ' + apiUrl + '/message/' + data.conversationId);
        return axios.post(apiUrl + '/message/' + data.conversationId, {
            content: data.message,
            userId: data.userId
        });
    }
}

export default Messages;