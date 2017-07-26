export function onLoadConversationsAction(data) {
  return (dispatch) => {
    dispatch(onLoadConversations(data));
  }
}

function onLoadConversations(payload){
    return {
      type: "ON_LOAD_CONVERSATIONS",
      payload
    }
}

export function setActiveConversationAction(data) {
  return (dispatch) => {
    dispatch(setActiveConversation(data));
  }
}

function setActiveConversation(payload){
    return {
      type: "ON_SET_ACTIVE_CONVERSATION",
      payload
    }
}

export function onLoadMessagesAction(data) {
  return (dispatch) => {
    dispatch(onLoadMessages(data));
  }
}

function onLoadMessages(payload){
    return {
      type: "ON_LOAD_MESSAGES",
      payload
    }
}

export function onLoadRosterAction(data) {
  return (dispatch) => {
    dispatch(onLoadRoster(data));
  }
}

function onLoadRoster(payload){
    return {
      type: "ON_LOAD_ROSTER",
      payload
    }
}

export function addToAllUsersAction(data) {
  return (dispatch) => {
    dispatch(addToAllUsers(data));
  }
}

function addToAllUsers(payload){
    return {
      type: "ON_ADD_ALL_USERS",
      payload
    }
}