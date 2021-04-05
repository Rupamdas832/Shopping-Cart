import React, { createContext, useContext, useReducer } from "react";
import ProductReducer from "./productReducer";

const ProductContext = createContext()

export const useProduct = () => {
    return useContext(ProductContext)
}

export const ProductProvider = ({children}) => {
    const initialState = {
        sortBy: null,
        showPrimeChoice: false,
        showInventoryAll: false,
        category: null
    }
    const [productState, productDispatch] = useReducer(ProductReducer, initialState)
    return <ProductContext.Provider value={ { productState ,productDispatch }}>
        {children}
    </ProductContext.Provider>
}