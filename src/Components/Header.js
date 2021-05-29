import React from "react";
import "./Header.css";
import { FaShoppingBag, FaHeart } from "react-icons/fa";

import { Link, NavLink } from "react-router-dom";
import { useAuth, useStore, useUser } from "../Store";
import axios from "axios";
import { URL } from "../Api/apiURL";

export const Header = () => {
  const { storeState, storeDispatch } = useStore();
  const { cart } = storeState;

  const { userState, userDispatch } = useUser();
  const { user, isUserLogin } = userState;

  const getAllCartItems = (array) => {
    return array.reduce((total, { quantity }) => total + quantity, 0);
  };

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

  const logoutUser = () => {
    localStorage.removeItem("CartLoginUser");
    userDispatch({ type: "USER_LOGOUT" });
    fetchProducts();
  };

  return (
    <div className="navbar">
      <div className="navLogo">
        <img
          src="https://thumbs.dreamstime.com/b/letter-gg-simple-logo-icon-design-vector-simple-circle-logo-vector-illustration-letter-gg-simple-logo-icon-design-vector-180925896.jpg"
          alt="logo"
        />
      </div>
      <div className="navLinks">
        <NavLink to="/" exact>
          <button className="navBtn">Home</button>
        </NavLink>
        <NavLink to="/products" exact>
          <button className="navBtn">Products</button>
        </NavLink>
      </div>
      <div className="navAction">
        {isUserLogin && user ? (
          <div className="navActionItems">
            <div className="tooltip">
              <Link to="/wishlist">
                <button className="navBtn">
                  <FaHeart />
                </button>
              </Link>
              <span className="tooltipText">WishList</span>
            </div>
            <div className="tooltip">
              <Link to="/cart">
                <button className="navBtn">
                  <FaShoppingBag />
                </button>
              </Link>
              <span className="tooltipText">Shopping Bag</span>
              {cart.length === 0 ? null : (
                <span className="badge">{getAllCartItems(cart)}</span>
              )}
            </div>
            <div className="dropdown">
              <button className="btnFloat">
                {user.name.charAt(0).toUpperCase()}
              </button>
              <div className="dropdownContent">
                <ul>
                  <Link to="/profile">
                    <li>Profile</li>
                  </Link>
                  <Link to="/order">
                    <li>Orders</li>
                  </Link>
                  <li onClick={logoutUser}>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button className="navBtn">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};
