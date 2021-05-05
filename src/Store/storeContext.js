import React, { createContext, useContext, useReducer } from 'react'
import StoreReducer from './storeReducer'

const StoreContext = createContext()

export const useStore = () => {
    return useContext(StoreContext)
}

export const StoreProvider = ({children}) => {

    const initialState = {
        products: [], 
        cart: [],
        isLoading: null,
        address: [],
        paymentCards: []
    }

    const [storeState, storeDispatch] = useReducer(StoreReducer, initialState)

    return <StoreContext.Provider value={ {storeState, storeDispatch} }>{children}</StoreContext.Provider>
}

