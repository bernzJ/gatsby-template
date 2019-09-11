import { createStore } from "redux"
import rootReducer from "../reducers/index"

export default (initialState, history) => {
    const store = createStore(
        rootReducer,
        initialState
    )
    return store
}