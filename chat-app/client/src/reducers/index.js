import { combineReducers } from "redux"

import conversationsReducer from "./conversationsReducer"
import messagesReducer from "./messagesReducer"
import usersReducer from "./usersReducer"
import searchReducer from "./searchReducer"

export default combineReducers({
    conversationsReducer,
    usersReducer,
    messagesReducer,
    searchReducer
})
