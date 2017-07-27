const _ = require('lodash');


export default function(state = {}, action) {
    let data;
    let conversations;

    console.log("ConversationReducer")

  switch (action.type) {

    case "ON_LOAD_CONVERSATIONS": 
        conversations = _.keyBy(action.payload, conversation => conversation.id);
        data = Object.assign({}, state, {'conversations': conversations });
        return data


    case "ON_SET_ACTIVE_CONVERSATION":
        data = Object.assign({}, state, {'activeConversation': action.payload}); 
        return data

    case "ON_LOAD_ROSTER":
        const roster = action.payload.result.groupMembers;
        data = Object.assign({}, state, {'roster': roster});
        return data;

    case "ON_INCREMENT_UNREAD":
        const newMessage = action.payload;
        const newMessageConversationId = newMessage.conversationId;
        conversations = _.cloneDeep(state.conversations);
        conversations[newMessageConversationId].unread++;
        data = Object.assign({}, state, {'conversations': conversations });
        return data


    case "ON_NEW_CONVERSATION_CREATED":
        const newConversation = action.payload;
        conversations = _.cloneDeep(state.conversations);
        conversations[newConversation.id] = newConversation;
        data = Object.assign({}, state, {'conversations': conversations });
        return data;


    // case "ON_SET_CONVERSATIONS":
    //     data = Object.assign({}, state, {'activeConversation': action.payload}); 
    //     return data

    // case "ON_SHOW_NEW_MESSAGE_NOTIFICATION":
    //     // console.log(state,action.payload)
    //     const unreadConversationId = action.payload.conversationId
    //     conversations = _.cloneDeep(state.conversationMap);
    //     conversations[unreadConversationId].unread++;
    //     data = Object.assign({}, state, {'conversationMap': conversations});
    //     return data


    case "ON_UNREAD_RESET_COUNTS":
        const readConversationId = action.payload.conversationId;
        conversations = _.cloneDeep(state.conversations);
        conversations[readConversationId].unread = 0;
        data = Object.assign({}, state, {'conversations': conversations});
        return data;

    // case "ON_LOAD_ROSTER":
    //     const usersData = action.payload;
    //     const rosterIds = _.keys(usersData.entities.groupMembers); 
    //     data = Object.assign({}, state, { 'rosterUserIds' : rosterIds });
    //     return data;

    // case "ON_UPDATE_ROSTER":
    //     const newUserData = action.payload;
    //     const userInfo = newUserData.user;
    //     conversationId = newUserData.conversationId;

    //     data = Object.assign({}, state, {'rosterUserIds': rosterIds});
    //     return data;

    // case "ADD_USER_TO_ROSTER":
    //     console.log("called ADD_USER_TO_ROSTER")
    //     const newUserId = action.payload.user.id.toString();
    //     const updatedRosterIds = state.rosterUserIds;
    //     if(updatedRosterIds.indexOf(newUserId) > -1){
    //         return state;
    //     }
    //     updatedRosterIds.push(newUserId)
    //     data = Object.assign({}, state, {'rosterUserIds': updatedRosterIds});
    //     return data;

    // case "GET_USER_ROLE":
    //     const user = action.payload;
    //     const userRole = user.role;
    //     data = Object.assign({}, state, {'userRole': userRole});
    //     return data

    default:
      return state;
  }
} 

