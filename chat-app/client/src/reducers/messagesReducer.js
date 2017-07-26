export default function(state = {}, action) {
    let data;
  switch (action.type) {
    case "ON_LOAD_NEW_MESSAGES":
        const newMessage = action.payload.messagesData;
        // state.conversationMessages.messagesData.push(newMessage);
        state.messages.push(newMessage)
        data = Object.assign({}, state);
        return data

    case "ON_LOAD_MESSAGES": 
        data = Object.assign({}, state, {'messages': action.payload.messagesData.messages});
        return data

    default:
      return state;
  }
} 



