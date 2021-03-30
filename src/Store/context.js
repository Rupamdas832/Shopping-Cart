import React, { createContext, useContext, useReducer } from 'react'
import Products from "../Assets/Products"
import StoreReducer from '../Store/reducer'

const StoreContext = createContext()


export const useStore = () => {
    return useContext(StoreContext)
}

export const StoreProvider = ({children}) => {

    const initialState = {
        products: Products, 
        cart: []
    }

    const [state, dispatch] = useReducer(StoreReducer, initialState)

    return <StoreContext.Provider value={ {state, dispatch} }>{children}</StoreContext.Provider>
}

