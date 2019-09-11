import { combineReducers } from "redux"
import { reducer as menuReducer } from "./menu"
import { reducer as siteMetadataReducer } from "./sitemetadata"
import { reducer as sessionReducer } from "./session"

export default combineReducers({
    menuReducer,
    siteMetadataReducer,
    sessionReducer
});