const _ = require('lodash');
export default function(state = {}, action) {
    let data;
    let messages;
  switch (action.type) {

    case "ON_SHOW_NEW_MESSAGE":
        const newMessage = action.payload;
        messages = _.values(state.messages)
        messages.push(newMessage);
        data = Object.assign({}, state, {'messages': messages});
        return data

    case "ON_LOAD_MESSAGES": 
        messages = action.payload.entities.messages;
        data = Object.assign({}, state, {'messages': messages});
        return data

    default:
      return state;
  }
} 



