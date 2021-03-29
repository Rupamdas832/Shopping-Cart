import React, { createContext, useContext, useReducer } from 'react'
import Products from "../Assets/Products"
import CartReducer from './CartReducer'

const CartContext = createContext()


export const useCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({children}) => {

    const initialState = {
        products: Products, 
        cart: []
    }

    const [state, dispatch] = useReducer(CartReducer, initialState)

    return <CartContext.Provider value={ {state, dispatch} }>{children}</CartContext.Provider>
}

