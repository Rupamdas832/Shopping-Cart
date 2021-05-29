import { createContext, useContext, useReducer } from "react";
import { CheckoutReducer } from "./checkoutReducer";

export const CheckoutContext = createContext()

export const useCheckout = () => useContext(CheckoutContext)


export const CheckoutProvider = ({children}) => {

    const initialValues = {
        addressSelected: null,
        cardSelected: null,
        address: null,
        card: null,
        totalPrice: null
    }
    const [checkoutState, checkoutDispatch] = useReducer(CheckoutReducer, initialValues)
    
    return <CheckoutContext.Provider value={{checkoutState, checkoutDispatch}}>{children}</CheckoutContext.Provider>
}