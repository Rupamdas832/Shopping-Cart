import axios from "axios";
import React from "react";
import { useStore, useUser } from "../Store";
import { URL } from "../Api/apiURL";

export const CartItem = ({ cartItem, quantity }) => {
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

  const decreaseCount = async () => {
    if (quantity > 1) {
      storeDispatch({ type: "IS_LOADING", payload: "removing" });
      try {
        const {
          data: { cart },
          status,
        } = await axios.delete(`${URL}/cart/${_id}`, {
          headers: { Authorization: token },
        });
        if (status === 200) {
          storeDispatch({ type: "DECREASE_COUNT", payload: _id });
          const loginStatus = JSON.parse(localStorage.getItem("CartLoginUser"));
          loginStatus.cart = cart.products;
          localStorage.setItem("CartLoginUser", JSON.stringify(loginStatus));
        }
      } catch (error) {
        console.log(error.response.data);
      } finally {
        storeDispatch({ type: "IS_LOADING", payload: "success" });
      }
    } else return null;
  };

  const increaseCount = async () => {
    storeDispatch({ type: "IS_LOADING", payload: "adding" });
    try {
      const {
        data: { cart },
        status,
      } = await axios.post(
        `${URL}/cart`,
        {
          _id: _id,
        },
        {
          headers: { Authorization: token },
        }
      );
      if (status === 201) {
        storeDispatch({ type: "INCREASE_COUNT", payload: _id });
        const loginStatus = JSON.parse(localStorage.getItem("CartLoginUser"));
        loginStatus.cart = cart.products;
        localStorage.setItem("CartLoginUser", JSON.stringify(loginStatus));
      }
    } catch (error) {
      console.log(error);
    } finally {
      storeDispatch({ type: "IS_LOADING", payload: "success" });
    }
  };

  const toggleWishlist = async (id) => {
    storeDispatch({ type: "IS_LOADING", payload: "wishlisting" });
    try {
      const response = await axios.post(
        `${URL}/wishlist/`,
        {
          _id: _id,
        },
        {
          headers: { Authorization: token },
        }
      );
      if (response.status === 201) {
        storeDispatch({ type: "ADD_TO_WISHLIST", payload: _id });
        const loginStatus = JSON.parse(localStorage.getItem("CartLoginUser"));
        loginStatus.wishlist.push({ _id });
        localStorage.setItem("CartLoginUser", JSON.stringify(loginStatus));
      }
    } catch (error) {
      console.log(error);
    } finally {
      storeDispatch({ type: "IS_LOADING", payload: "success" });
    }
    removeItem(id);
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
            <button className="btn outline" onClick={() => decreaseCount()}>
              -
            </button>
            {quantity}
            <button className="btn outline" onClick={() => increaseCount()}>
              +
            </button>
          </div>
        </div>
        <div className="btnsFlat small">
          <button
            className="btn outline cart"
            onClick={() => toggleWishlist(_id)}
          >
            {isWishlist ? "Wishlisted" : "Move to wishlist"}
          </button>
          <button className="btn cart" onClick={() => removeItem(_id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
