export const CheckoutReducer = (state,action) => {
    switch (action.type) {
        case "SELECT_ADDRESS":
            return {...state, address: action.payload, addressSelected: action.payload._id}
        case "SELECT_CARD":
            return {...state, card: action.payload, cardSelected: action.payload._id}
        default:
            break;
    }
}