import axios from 'axios';
class Conversations {

    getConversationsByUser(data){
        // data : {userId}
        // console.log(data);
        const apiUrl = 'http://localhost:3002/api';
        // console.log('GET ' + apiUrl + '/groupMember/user/' + data.userId);
        return axios.get(apiUrl + '/groupMember/user/' + data.userId);
    }

    getConversationMessages(data){
        // data : {conversationId}
    }

    addNewConversation(data){
        const apiUrl = 'http://localhost:3002/api';
        return axios.post(apiUrl + '/conversation/', {
            name: data.conversationName,
            privacy: data.conversationPrivacy,
            conversationType: data.conversationType,
            role: data.conversationRole
        });
    }
}

export default Conversations;