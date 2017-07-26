import { addUsersToAllUsers, addUserToAllUsers } from "../actions/userActions";

console.log("conversationAction")

export function onLoadConversationsClientAction(data){
    return (dispatch) => {
        dispatch(onLoadConversationsClient(data))
    }
}

function onLoadConversationsClient(data){
    console.log("asdfa;")
  return {
      type: "ON_LOAD_CONVERSATIONS",
      payload : data
  }
}

export function setActiveConversationAction(data){
    return (dispatch) => {
        dispatch(SetActiveConversation(data))
    }
}

function SetActiveConversation(data){
    return {
        type: "ON_SET_CONVERSATIONS",
        payload : data
    }
}

export function resetUnreadCountAction(data){
    return (dispatch) => {
        dispatch(ResetUnreadCount(data))
    }
}

function ResetUnreadCount(data){
    return {
        type: "ON_RESET_UNREAD_COUNT",
        payload : data
    }
}

export function onLoadConversationRosterAction(data){
    return (dispatch) => {
        dispatch(addUsersToAllUsers(data));
        dispatch(onLoadConversationRoster(data));
    }
}

export function onSetUserConversationRoleAction(data){
    return (dispatch) => {
        dispatch(getUserRoleForConversation(data));
    }
}

function getUserRoleForConversation(data){
    console.log("I was called")
    return {
        type: "GET_USER_ROLE",
        payload: data
    }
}

export function addUserIdToRosterIdsAction(data){
    console.log("called addUserIdToRosterIdsAction");
    return {
        type: "ADD_USER_TO_ROSTER",
        payload: data
    }
}

function onLoadConversationRoster(data){
    return {
        type: "ON_LOAD_ROSTER",
        payload : data
    }
}

function onLoadConverationRoster(data){
    return {
        type: "ON_UPDATE_ROSTER",
        payload : data
    }
}