import axios from 'axios';
class GroupMembers {

    resetUnreadCount(data){
        const apiUrl = 'http://localhost:3002/api';
        // console.log('POST ' + apiUrl + '/message/' + data.conversationId);
        return axios.post(apiUrl + '/groupMember/reset', {
            conversationId: data.conversationId,
            userId: data.userId
        });
    }

    getRosterData(data){
        const apiUrl = 'http://localhost:3002/api';
        // console.log('POST ' + apiUrl + '/message/' + data.conversationId);
        return axios.get(apiUrl + '/groupMember/' + data.conversationId);
    }

    addUserToGroup(data){
        const apiUrl = 'http://localhost:3002/api';
        // console.log('POST ' + apiUrl + '/message/' + data.conversationId);
        return axios.post(apiUrl + '/groupMember/user/' + data.userId, {
            conversationId: data.conversationId,
            role: data.role
        });
    }

    removeUserFromGroup(data){
        const apiUrl = 'http://localhost:3002/api';
        // console.log('POST ' + apiUrl + '/message/' + data.conversationId);
        return axios.delete(apiUrl + '/groupMember/user/' + data.userId, {
            conversationId: data.conversationId,
        });
    }

    getUserRole(data){
        const apiUrl = 'http://localhost:3002/api';
        // console.log('POST ' + apiUrl + '/message/' + data.conversationId);
        return axios.get(apiUrl + '/groupMember/role?user=' + data.userId +'&conversation=' + data.conversationId);
    }

}

export default GroupMembers;