export const ProductReducer = (state, action) => {
    switch (action.type) {
        case "SORT": 
            return {...state, sortBy: action.payload}
        case "TOGGLE_INVENTORY":
            return {...state, showInventoryAll: !state.showInventoryAll}
        case "TOGGLE_PRIME_CHOICE":
            return {...state, showPrimeChoice: !state.showPrimeChoice}
        case "CATEGORY":
            return {...state, category: action.payload}
        case "RESET":
            return {...state, 
                sortBy: null,
                showPrimeChoice: false,
                showInventoryAll: false,
                category: null}
        default:
            return state
    }
}