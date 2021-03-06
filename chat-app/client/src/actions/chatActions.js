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

export function onShowNewMessageAction(data) {
  return (dispatch) => {
    dispatch(onShowNewMessage(data));
  }
}

function onShowNewMessage(payload){
    return {
      type: "ON_SHOW_NEW_MESSAGE",
      payload
    }
}

export function incrementUnreadCountAction(data) {
  return (dispatch) => {
    dispatch(incrementUnreadCount(data));
  }
}

function incrementUnreadCount(payload){
    return {
      type: "ON_INCREMENT_UNREAD",
      payload
    }
}

export function onResetUnreadCountsAction(data) {
  return (dispatch) => {
    dispatch(onResetUnreadCounts(data));
  }
}

function onResetUnreadCounts(payload){
    return {
      type: "ON_UNREAD_RESET_COUNTS",
      payload
    }
}


export function onSearchResultsAction(data) {
  return (dispatch) => {
    dispatch(onSearchResults(data));
  }
}

function onSearchResults(payload){
    return {
      type: "ON_SEARCH_RESULTS",
      payload
    }
}

export function clearSearchResultsAction(data) {
  return (dispatch) => {
    dispatch(clearSearchResults(data));
  }
}

function clearSearchResults(payload){
    return {
      type: "CLEAR_SEARCH_RESULTS",
      payload
    }
}

export function onNewConversationCreatedAction(data) {
  return (dispatch) => {
    dispatch(onNewConversationCreated(data));
  }
}

function onNewConversationCreated(payload){
    return {
      type: "ON_NEW_CONVERSATION_CREATED",
      payload
    }
}

export function setActiveUserAction(data) {
  return (dispatch) => {
    dispatch(setActiveUser(data));
  }
}

function setActiveUser(payload){
    return {
      type: "ON_SET_ACTIVE_USER",
      payload
    }
}

export function removeUserFromRosterAction(data) {
  return (dispatch) => {
    dispatch(removeUserFromRoster(data));
  }
}

function removeUserFromRoster(payload){
    return {
      type: "ON_REMOVE_FROM_ROSTER",
      payload
    }
}





