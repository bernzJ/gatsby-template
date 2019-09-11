import createCustomReducer from "./createCustomReducer"


export const { actions, reducer } = createCustomReducer("Sitemetadata",
    {
        type: "INIT_SITE",
        site: {}
    }, {
        setMeta: (state, site) => ({ ...state, site })
    });