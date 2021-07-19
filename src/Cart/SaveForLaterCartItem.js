import axios from "axios";
import React from "react";
import { useStore, useUser } from "../Store";
import { URL } from "../Api/apiURL";

export const SaveForLaterCartItem = ({ cartItem, quantity }) => {
  const { _id, name, price, isWishlist, img } = cartItem;
  const { storeDispatch } = useStore();

  const { userState } = useUser();
  const { token } = userState;

  const removeItem = async (_id) => {
    storeDispatch({ type: "IS_LOADING", payload: "removing" });
    try {
      const {
        data: { cart },
        status,
      } = await axios.delete(`${URL}/cart/`, {
        headers: { Authorization: token },
        data: {
          _id: _id,
        },
      });
      if (status === 200) {
        storeDispatch({ type: "REMOVE_FROM_CART", payload: _id });
        const loginStatus = JSON.parse(localStorage.getItem("CartLoginUser"));
        loginStatus.cart = cart.products;
        localStorage.setItem("CartLoginUser", JSON.stringify(loginStatus));
      }
    } catch (error) {
      console.log(error.response.data);
    } finally {
      storeDispatch({ type: "IS_LOADING", payload: "success" });
    }
  };

  const saveForLater = async (id) => {
    storeDispatch({ type: "IS_LOADING", payload: "savingForLater" });
    try {
      const {
        data: { cart },
        status,
      } = await axios.post(
        `${URL}/cart/${id}`,
        {
          _id: id,
        },
        {
          headers: { Authorization: token },
        }
      );
      if (status === 200) {
        storeDispatch({ type: "SAVE_FOR_LATER", payload: cart.products });
        const loginStatus = JSON.parse(localStorage.getItem("CartLoginUser"));
        loginStatus.cart = cart;
        localStorage.setItem("CartLoginUser", JSON.stringify(loginStatus));
      }
    } catch (error) {
      console.log(error);
    } finally {
      storeDispatch({ type: "IS_LOADING", payload: "success" });
    }
  };

  return (
    <div className="flatCard small" key={_id}>
      <div className="imgFlat small">
        <img src={img} alt="cart" />
      </div>
      <div className="detailFlat small">
        <h2>{name}</h2>
        <div className="priceFlat small">
          <h4>₹{price}</h4>
          <div>
            <button className="btn outline" disabled={true}>
              -
            </button>
            {quantity}
            <button className="btn outline" disabled={true}>
              +
            </button>
          </div>
        </div>
        <div className="btnsFlat small">
          <button
            className="btn outline cart"
            onClick={() => saveForLater(_id)}
          >
            Move to cart
          </button>
          <button className="btn cart" onClick={() => removeItem(_id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
