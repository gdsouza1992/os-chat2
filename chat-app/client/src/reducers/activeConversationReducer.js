export default function(state = {}, action) {
    let data;
    switch (action.type) {
        case "CHANGE_ACTIVE_CONVERSATION":
            data = Object.assign({}, state, {'activeConversationId': action.payload});
            return data;

        case "GET_ACTIVE_CONVERSATION":
            return state
        default:
            return state;
    }
} 

