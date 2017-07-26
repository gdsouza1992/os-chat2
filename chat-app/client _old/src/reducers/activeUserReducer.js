export default function(state = {}, action) {
  switch (action.type) {
    case "SET_ACTIVE_USER":
        const data = Object.assign({}, state, {'activeUserId': action.payload});
        return data
    default:
      return state;
  }
} 

