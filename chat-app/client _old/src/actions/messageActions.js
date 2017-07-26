// const config = require('../config');

// "baseURL": "http://localhost:3001/api/"

export function onLoadMessagesClientAction(data){
    return (dispatch) => {
        dispatch(onLoadMessagesClient(data))
    }
}

function onLoadMessagesClient(data){
  return {
      type: "ON_LOAD_MESSAGES",
      payload : data
  }
}

export function onLoadNewMessagesClientAction(data, activeConversation, activeUserId){

    // If the chat window with same conversation id as new message is open 
    // add the new message to the message list  in the state
    if(data.conversationId === activeConversation){
      return (dispatch) => {
        dispatch(onLoadNewMessagesClient(data));
      }
    } else {
      if (data.sender !== activeUserId) {
        return(dispatch) => {
          dispatch(onShowNotification(data));
        }
      }
    }
}

function onLoadNewMessagesClient(data){
  return {
      type: "ON_LOAD_NEW_MESSAGES",
      payload : data
  }
}

function onShowNotification(data){
  return {
      type: "ON_SHOW_NEW_MESSAGE_NOTIFICATION",
      payload : data
  }
}

export function sendMessageClientAction(data) {
    return (dispatch) => {
        dispatch(onSendMessagesClient(data))
    }
}

function onSendMessagesClient(data){
  return {
      type: "ON_SEND_MESSAGE",
      payload : data
  }
}