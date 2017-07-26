export default function(state = {}, action) {
    let data;
  switch (action.type) {
    case "ON_LOAD_NEW_MESSAGE12S":
        data = Object.assign({}, state, {'newMessage': action.payload});
        return data

    default:
      return state;
  }
} 


