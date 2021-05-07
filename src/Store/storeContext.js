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
        address: [{
            address: "Govt Fair Price Shop, RLY Traffic Colony, Po- Golpahadi, Thana- Bagbera,Bagbera Road",
            city: "Jamshedpur",
            mobile: "96321458741",
            pincode: "831002",
            senderName: "RUPAM DAS",
            state: "Jharkhand",
            _id: "7a49936e-29d5-4cad-b357-7c311142eee8"
        },{
            address: "H.No-38,Govt Fair Price Shop,",
            city: "Jamshedpur",
            mobile: "08102427901",
            pincode: "831002",
            senderName: "Aman Rai",
            state: "Jharkhand",
            _id: "a7fa91fa-18c1-4547-8a1e-20c85ea6453f"
        }],
        paymentCards: [{
            cardNumber: "1234567898745612",
            cardType: "Master",
            month: "12",
            name: "Rupam Das",
            year: "23",
            _id: "ae03606e-53cc-4615-8494-1519b4bb5248"
        },{
            cardNumber: "3541897564123548",
            cardType: "Visa",
            month: "25",
            name: "Aman Rai",
            year: "32",
            _id: "bd8524ca-f97a-4d93-acb6-93c4a7f3a1ef"
        }],
        orders: []
    }

    const [storeState, storeDispatch] = useReducer(StoreReducer, initialState)

    return <StoreContext.Provider value={ {storeState, storeDispatch} }>{children}</StoreContext.Provider>
}

