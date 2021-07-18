import React, { createContext, useContext, useReducer } from "react";
import StoreReducer from "./storeReducer";

const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

const loginStatus = JSON.parse(localStorage.getItem("CartLoginUser"));

let initialState;

if (loginStatus?.isUserLogin) {
  initialState = {
    products: [],
    cart: loginStatus.cart,
    wishlist: loginStatus.wishlist,
    isLoading: null,
    orders: loginStatus.orders,
    address: loginStatus.address,
    paymentCards: loginStatus.paymentCards,
  };
} else {
  initialState = {
    products: [],
    cart: [],
    wishlist: [],
    isLoading: null,
    orders: [],
    address: [],
    paymentCards: [],
  };
}

export const StoreProvider = ({ children }) => {
  const [storeState, storeDispatch] = useReducer(StoreReducer, initialState);

  return (
    <StoreContext.Provider value={{ storeState, storeDispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
