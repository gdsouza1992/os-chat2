import { combineReducers } from "redux"

import conversations from "./conversationsReducer"
import messages from "./messagesReducer"
import activeUser from "./activeUserReducer"
import users from "./usersReducer"

export default combineReducers({
    conversations,
    messages,
    users,
    activeUser
})
