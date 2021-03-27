const CartReducer = (state,action) => {
    switch (action.type) {
        case "REMOVE":
            return state.filter(cart => cart.id !== action.payload)
        case "INC":
            return state.map(cart => {
                if(cart.id === action.payload){
                    return {...cart, quantity: cart.quantity + 1}
                }
                return cart
            })
        case "DEC":
            return state.map(cart => {
                if(cart.id === action.payload){
                    return {...cart, quantity: cart.quantity - 1}
                }
                return cart
        })
    }
}
export default CartReducer