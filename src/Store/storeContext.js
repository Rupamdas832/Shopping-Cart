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
  };
} else {
  initialState = {
    products: [],
    cart: [],
    wishlist: [],
    isLoading: null,
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
