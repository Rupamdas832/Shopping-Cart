import React from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStore, useUser } from "../Store";
import { URL } from "../Api/apiURL";

export const ProductItem = ({ product }) => {
  const {
    _id,
    name,
    price,
    img,
    isWishlist,
    discount,
    inCart,
    inStock,
    isPrimeChoice,
    rating,
    category,
  } = product;
  const { storeDispatch } = useStore();

  const { userState, userDispatch } = useUser();
  const { isUserLogin, token } = userState;

  const loginToggler = () => {
    if (isUserLogin) {
      return userDispatch({ type: "LOGIN_MODAL", payload: false });
    } else return userDispatch({ type: "LOGIN_MODAL", payload: true });
  };

  const toggleWishlist = async () => {
    if (isWishlist) {
      storeDispatch({ type: "IS_LOADING", payload: "removing from wishlist" });
      try {
        const {
          data: { wishlist },
          status,
        } = await axios.delete(`${URL}/wishlist`, {
          headers: { Authorization: token },
          data: {
            _id: _id,
          },
        });
        if (status === 200) {
          storeDispatch({ type: "REMOVE_FROM_WISHLIST", payload: _id });
          const loginStatus = JSON.parse(localStorage.getItem("CartLoginUser"));
          loginStatus.wishlist = wishlist.products;
          localStorage.setItem("CartLoginUser", JSON.stringify(loginStatus));
        }
      } catch (error) {
        console.log(error.response.data);
      } finally {
        storeDispatch({ type: "IS_LOADING", payload: "success" });
      }
    } else {
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
    }
  };
  const addToCart = async () => {
    storeDispatch({ type: "IS_LOADING", payload: "adding" });
    try {
      const response = await axios.post(
        `${URL}/cart`,
        {
          _id: _id,
        },
        {
          headers: { Authorization: token },
        }
      );
      if (response.status === 201) {
        const newCartItem = {
          _id: _id,
          quantity: 1,
        };
        storeDispatch({ type: "ADD_TO_CART", payload: newCartItem });
        const loginStatus = JSON.parse(localStorage.getItem("CartLoginUser"));
        loginStatus.cart.push(newCartItem);
        localStorage.setItem("CartLoginUser", JSON.stringify(loginStatus));
      }
    } catch (error) {
      console.log(error);
    } finally {
      storeDispatch({ type: "IS_LOADING", payload: "success" });
    }
  };

  return (
    <div className="ecommerceCard">
      {!inStock && (
        <div className="outOfStockCard">
          <h2>Out of Stock</h2>
        </div>
      )}
      {isPrimeChoice && (
        <div className="cardBadge">
          <h5>Prime</h5>
        </div>
      )}
      <div className="cardLike">
        {isUserLogin ? (
          <button className="btn outline" onClick={() => toggleWishlist(_id)}>
            {isWishlist ? <FcLike /> : <FcLikePlaceholder />}
          </button>
        ) : (
          <button className="btn outline" onClick={() => loginToggler()}>
            {isWishlist ? <FcLike /> : <FcLikePlaceholder />}
          </button>
        )}
      </div>
      <div className="cardImage">
        <img src={img} alt="product" />
      </div>
      <div className="cardBody">
        <div className="cardTitle">
          <p>
            {name} ({category})
          </p>
          <span>
            <FaStar />
            {rating}
          </span>
        </div>
        <div className="cardPrice">
          <h4>₹ {price}</h4>
          <h5>{discount}% off</h5>
        </div>
      </div>
      <div className="cardFooter">
        <Link to={`/productDetail/${_id}`}>
          <button className="btn outline">Detail...</button>
        </Link>
        {isUserLogin ? (
          <div>
            {inCart ? (
              <Link to="/cart">
                <button className="actionBtn">Go to Cart</button>
              </Link>
            ) : (
              <button className="btn" onClick={() => addToCart()}>
                Add to Cart
              </button>
            )}
          </div>
        ) : (
          <button className="btn" onClick={() => loginToggler()}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};
