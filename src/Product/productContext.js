import { createContext, useContext, useReducer } from "react";
import ProductReducer from "./productReducer";

const ProductContext = createContext()

export const useProduct = () => {
    return useContext(ProductContext)
}

export const ProductProvider = ({children}) => {
    const initialState = {
        sortedData = [],
        showInventoryAll = true,
        sortBy: null
    }
    const [state, dispatch] = useReducer(ProductReducer, initialState)
    return <ProductContext.Provider value={ {state,dispatch}}>
        {children}
    </ProductContext.Provider>
}