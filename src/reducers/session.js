import createCustomReducer from "./createCustomReducer"


export const { actions, reducer } = createCustomReducer("Session",
    {
        initialized: false
    }, {
        setSession: (state) => ({ ...state, initialized: true })
    });