const _ = require('lodash');


export default function(state = {}, action) {
    let data;
    let conversations;
    let conversationId;

    console.log("ConversationReducer")

  switch (action.type) {

    case "ON_LOAD_CONVERSATIONS": 
        conversations = _.keyBy(action.payload, conversation => conversation.conversationId);
        data = Object.assign({}, state, {'conversationMap': conversations });
        return data

    case "ON_SET_CONVERSATIONS":
        data = Object.assign({}, state, {'activeConversation': action.payload}); 
        return data

    case "ON_SHOW_NEW_MESSAGE_NOTIFICATION":
        // console.log(state,action.payload)
        const unreadConversationId = action.payload.conversationId
        conversations = _.cloneDeep(state.conversationMap);
        conversations[unreadConversationId].unread++;
        data = Object.assign({}, state, {'conversationMap': conversations});
        return data


    case "ON_RESET_UNREAD_COUNT":
        // const conversationId = action.payload.conversationId;
        // const status = action.payload.status;
        const readConversationId = action.payload.conversationId;
        conversations = _.cloneDeep(state.conversationMap);
        conversations[readConversationId].unread = 0;
        data = Object.assign({}, state, {'conversationMap': conversations});
        return data;

    case "ON_LOAD_ROSTER":
        const usersData = action.payload;
        const rosterIds = _.keys(usersData.entities.groupMembers); 
        data = Object.assign({}, state, { 'rosterUserIds' : rosterIds });
        return data;

    case "ON_UPDATE_ROSTER":
        const newUserData = action.payload;
        const userInfo = newUserData.user;
        conversationId = newUserData.conversationId;

        data = Object.assign({}, state, {'rosterUserIds': rosterIds});
        return data;

    case "ADD_USER_TO_ROSTER":
        console.log("called ADD_USER_TO_ROSTER")
        const newUserId = action.payload.user.id.toString();
        const updatedRosterIds = state.rosterUserIds;
        if(updatedRosterIds.indexOf(newUserId) > -1){
            return state;
        }
        updatedRosterIds.push(newUserId)
        data = Object.assign({}, state, {'rosterUserIds': updatedRosterIds});
        return data;

    case "GET_USER_ROLE":
        const user = action.payload;
        const userRole = user.role;
        data = Object.assign({}, state, {'userRole': userRole});
        return data

    default:
      return state;
  }
} 

