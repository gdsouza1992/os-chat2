import { combineReducers } from "redux"

import conversationsReducer from "./conversationsReducer"
// import messages from "./messagesReducer"
// import activeUser from "./activeUserReducer"
import usersReducer from "./usersReducer"

export default combineReducers({
    conversationsReducer,
    usersReducer
    // messages,
    // users,
    // activeUser
})
