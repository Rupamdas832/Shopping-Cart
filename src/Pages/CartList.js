import React, { useEffect } from "react";
import "./CartList.css";
import { CartItem, CartTotal, SaveForLaterCartItem } from "../Cart";
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

  const getSaveForLaterItems = (cart) => {
    const inActiveItems = cart.filter((item) => item.status === false);
    return inActiveItems.length;
  };

  const getActiveItems = (cart) => {
    const activeItems = cart.filter((item) => item.status === true);
    return activeItems.length;
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
      {products.length === 0 ? (
        <div className="spinner"></div>
      ) : (
        <div>
          {cart.length === 0 ? (
            <p>Your Shopping bag is empty!</p>
          ) : (
            <div className="cartListContainer">
              <div className="cartList">
                <div className="activeCartItems">
                  {getActiveItems(cart) === 0 ? null : (
                    <h3>Cart Items ({getActiveItems(cart)})</h3>
                  )}
                  {cart.map((cartItem) => {
                    let productFound = undefined;
                    if (cartItem.status) {
                      productFound = products.find(
                        (product) => product._id === cartItem._id
                      );
                    }
                    if (productFound) {
                      return (
                        <CartItem
                          cartItem={productFound}
                          quantity={cartItem.quantity}
                          key={cartItem._id}
                        />
                      );
                    } else return null;
                  })}
                </div>

                <div>
                  <h3>Save for later ({getSaveForLaterItems(cart)})</h3>
                  {cart.map((cartItem) => {
                    let productFound = undefined;
                    if (!cartItem.status) {
                      productFound = products.find(
                        (product) => product._id === cartItem._id
                      );
                    }
                    if (productFound) {
                      return (
                        <SaveForLaterCartItem
                          cartItem={productFound}
                          quantity={cartItem.quantity}
                          key={cartItem._id}
                        />
                      );
                    } else return null;
                  })}
                </div>
              </div>
              {cart.find((item) => item.status === true) && (
                <div className="cartTotal">
                  <CartTotal />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
