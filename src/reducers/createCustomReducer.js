const buildKey = (name, key) => `${name}/${key}`;
export default (name, initialState, actionHandlers) => {
    const actions = Object.keys(actionHandlers).reduce((acc, key) => ({
        ...acc,
        [key]: (...params) => ({ type: buildKey(name, key), payload: params })
    }), {});

    const reducer = (state = initialState, action) => {
        const handler = Object.keys(actionHandlers).find(key => buildKey(name, key) === action.type);

        if (handler) {
            return actionHandlers[handler](state, ...action.payload);
        }
        return state;
    }
    return { actions, reducer };
}