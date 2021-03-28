const CartReducer = (state,action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {...state, cart: state.cart.concat(action.payload)}
        case "REMOVE_FROM_CART":
            return {...state, cart: state.cart.filter(cart => cart.id !== action.payload)}
        case "INC_COUNT":
            return {...state, cart: state.cart.map(cart => {
                if(cart.id === action.payload){
                    return {...cart, quantity: cart.quantity + 1}
                }
                return cart
            })}
        case "DEC_COUNT":
            return {...state, cart: state.cart.map(cart => {
                if(cart.id === action.payload){
                    return {...cart, quantity: cart.quantity - 1}
                }
                return cart
        })}
        case "ADD_TO_WISHLIST":
            return {...state, wishlist: state.wishlist.concat(action.payload)}
        default:
            return state
    }
}
export default CartReducer