import createCustomReducer from "./createCustomReducer"


export const { actions, reducer } = createCustomReducer("Menu",
    {
        type: "INIT_MENU",
        menu: {
            logo: {},
            data: {}
        }
    }, {
        setMenu: (state, menu) => ({ ...state, menu })
    });