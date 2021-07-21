import React from "react";
import { useParams } from "react-router";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import "./ProductDetail.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { LoginModal, Toast } from "../Components";
import { useStore, useUser } from "../Store";
import { URL } from "../Api/apiURL";

export const ProductDetail = () => {
  const { productId } = useParams();

  const { storeState, storeDispatch } = useStore();
  const { isLoading, products } = storeState;

  const { userState, userDispatch } = useUser();
  const { token, isUserLogin, isLoginModalOpen } = userState;

  const SelectedProduct = products.find((product) => product._id === productId);
  const { _id, img, name, price, desc, rating, discount, isWishlist, inCart } =
    SelectedProduct;

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
          status: true,
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
    <div className="productDetailContainer">
      {isLoginModalOpen && <LoginModal />}
      {isLoading === "adding" ? <Toast message="Adding to Cart" /> : null}
      {isLoading === "wishlisting" ? (
        <Toast message="Adding to Wishlist" />
      ) : null}
      {isLoading === "removing from wishlist" ? (
        <Toast message="Removing from Wishlist" />
      ) : null}
      <div className="flatCard">
        <div className="imgFlat large">
          <img src={img} alt="card" />
        </div>
        <div className="detailFlat">
          <div className="cardTitle">
            <h2>{name}</h2>
            <span>
              <FaStar />
              {rating}
            </span>
          </div>
          <div className="priceFlat">
            <h4>₹{price}</h4>
            <h5>{discount}% off</h5>
          </div>
          <p>{desc}</p>
          <div className="btnsFlat">
            {isUserLogin ? (
              <button className="btn outline" onClick={() => toggleWishlist()}>
                {isWishlist ? <FcLike /> : <FcLikePlaceholder />}
              </button>
            ) : (
              <button className="btn outline" onClick={() => loginToggler()}>
                {isWishlist ? <FcLike /> : <FcLikePlaceholder />}
              </button>
            )}
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
      </div>
    </div>
  );
};
