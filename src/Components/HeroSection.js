import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import WishList from "../WishList/WishList";
import {
  Home,
  CartList,
  ProductDetail,
  ProductsList,
  Login,
  Signup,
  Profile,
  Checkout,
  OrderList,
} from "../Pages";
import { PrivateRoute } from "../Components";
import { URL } from "../Api/apiURL";
import { useStore } from "../Store";
import axios from "axios";

export const HeroSection = () => {
  const { storeDispatch } = useStore();

  const fetchProducts = async () => {
    storeDispatch({ type: "IS_LOADING", payload: "fetchingProducts" });
    try {
      const {
        data: { products },
        status,
      } = await axios.get(`${URL}/products`);
      if (status === 200) {
        storeDispatch({ type: "LOAD_PRODUCTS", payload: products });
        const loginStatus = JSON.parse(localStorage.getItem("CartLoginUser"));
        if (loginStatus.isUserLogin) {
          storeDispatch({ type: "LOAD_CART", payload: loginStatus.cart });
          storeDispatch({
            type: "LOAD_WISHLIST",
            payload: loginStatus.wishlist,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      storeDispatch({ type: "IS_LOADING", payload: "success" });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/productDetail/:productId" element={<ProductDetail />} />
      <PrivateRoute path="/cart" element={<CartList />} />
      <PrivateRoute path="/wishlist" element={<WishList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <PrivateRoute path="/profile" element={<Profile />} />
      <PrivateRoute path="/checkout" element={<Checkout />} />
      <PrivateRoute path="/order" element={<OrderList />} />
    </Routes>
  );
};
