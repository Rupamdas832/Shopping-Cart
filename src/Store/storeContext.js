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
        isLoading: null
    }

    const [state, dispatch] = useReducer(StoreReducer, initialState)

    return <StoreContext.Provider value={ {state, dispatch} }>{children}</StoreContext.Provider>
}

