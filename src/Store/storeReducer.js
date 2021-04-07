const StoreReducer = (state,action) => {
    switch (action.type) {
        case "IS_LOADING": 
            return {...state, isLoading: action.payload}
        case "LOAD_PRODUCTS":
            return {...state, products: action.payload.map(product => ({...product, isWishlist: false, inCart: false}))}
        case "LOAD_CART_ITEMS":
            return {...state, cart: action.payload}
        case "ADD_TO_CART":
            return {...state, 
                cart: state.cart.concat(action.payload), 
                products: state.products.map((product) => {
                    if(product.id === action.payload.id){
                        product.inCart = true;
                    }
                    return product
                })
            }
        case "REMOVE_FROM_CART":
            return {...state, 
                cart: state.cart.filter(cart => cart.id !== action.payload), 
                products: state.products.map(product => {
                    if(product.id === action.payload){
                        product.inCart = false;
                    }
                    return product
                })}
        case "INCREASE_COUNT":
            return {...state, cart: state.cart.map(cart => {
                if(cart.id === action.payload){
                    return {...cart, quantity: cart.quantity + 1}
                }
                return cart
            })}
        case "DECREASE_COUNT":
            return {...state, cart: state.cart.map(cart => {
                if(cart.id === action.payload){
                    return {...cart, quantity: cart.quantity <= 1 ? 1 : cart.quantity - 1}
                }
                return cart
        })}
        case "ADD_TO_WISHLIST":
            return {...state, 
                products: state.products.map(product => {
                    if(product.id === action.payload){
                        return {...product, isWishlist: true}
                    }
                    return product
                    }),
                cart: state.cart.map(product => {
                    if(product.id === action.payload){
                        return {...product, isWishlist: true}
                    }
                return product
            })
        }
        case "REMOVE_FROM_WISHLIST":
            return {...state, 
                products: state.products.map(product => {
                    if(product.id === action.payload){
                        return {...product, isWishlist: false}
                    }
                    return product
                    }),
                cart: state.cart.map(product => {
                    if(product.id === action.payload){
                        return {...product, isWishlist: false}
                    }
                return product})
        }
        default:
            return state
    }
}
export default StoreReducer