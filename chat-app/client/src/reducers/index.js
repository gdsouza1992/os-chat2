import { combineReducers } from "redux"

import conversationsReducer from "./conversationsReducer"
import messagesReducer from "./messagesReducer"
// import activeUser from "./activeUserReducer"
import usersReducer from "./usersReducer"

export default combineReducers({
    conversationsReducer,
    usersReducer,
    messagesReducer
    // users,
    // activeUser
})
