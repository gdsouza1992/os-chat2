import axios from 'axios';
class GroupMembers {

    resetUnreadCount(data){
        const apiUrl = 'http://localhost:3002/api';
        // console.log('POST ' + apiUrl + '/message/' + data.conversationId);
        return axios.post(apiUrl + '/groupMember/reset', {
            conversationId: data.conversation.id,
            userId: data.user.userId
        });
    }

    getRosterData(data){
        const apiUrl = 'http://localhost:3002/api';
        // console.log('POST ' + apiUrl + '/message/' + data.conversationId);
        return axios.get(apiUrl + '/groupMember/' + data.id);
    }

    addUserToGroup(data){
        const apiUrl = 'http://localhost:3002/api';
        // console.log('POST ' + apiUrl + '/message/' + data.conversationId);
        return axios.post(apiUrl + '/groupMember/user/' + data.userId, {
            conversationId: data.conversationId,
            role: data.role
        });
    }

    addUsersToGroup(groupMembers, conversationId){
        const apiUrl = 'http://localhost:3002/api';
        // console.log('POST ' + apiUrl + '/message/' + data.conversationId);
        return axios.post(apiUrl + '/groupMember/' + conversationId, {
            groupMembers: groupMembers
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