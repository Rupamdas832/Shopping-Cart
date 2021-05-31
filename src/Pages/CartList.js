import React, { useEffect } from "react";
import "./CartList.css";
import { CartItem, CartTotal } from "../Cart";
import { Toast } from "../Components";
import { useStore, useUser } from "../Store";
import { URL } from "../Api/apiURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CartList = () => {
  const { storeState } = useStore();
  const { isLoading, cart, products } = storeState;

  const navigate = useNavigate();

  const { userState } = useUser();
  const { token } = userState;

  const authenticateUser = async () => {
    try {
      await axios.get(`${URL}/user`, {
        headers: { authorization: token },
      });
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    authenticateUser();
  }, [token]);

  return (
    <div className="cartContainer">
      {isLoading === "removing" ? <Toast message="Removing from Cart" /> : null}
      {isLoading === "adding" ? <Toast message="Increasing Item" /> : null}
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your Shopping bag is empty!</p>
      ) : (
        <div className="cartListContainer">
          <div className="cartList">
            {cart.map((cartItem) => {
              const productFound = products.find(
                (product) => product._id === cartItem._id
              );
              return (
                <CartItem
                  cartItem={productFound}
                  quantity={cartItem.quantity}
                  key={cartItem._id}
                />
              );
            })}
          </div>
          <div className="cartTotal">
            <CartTotal />
          </div>
        </div>
      )}
    </div>
  );
};
