const initialState = {
    numeralList:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "test2":
        return { ...state, ...payload }

    default:
        return state
    }
}
