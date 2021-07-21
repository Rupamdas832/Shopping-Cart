import React, { useEffect } from "react";
import "./WishList.css";
import { Toast } from "../Components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useStore, useUser } from "../Store";
import { URL } from "../Api/apiURL";

const WishList = () => {
  const { storeState, storeDispatch } = useStore();
  const { isLoading, products } = storeState;

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

  const addToCart = async (_id) => {
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

  const removeFromWishlist = async (_id) => {
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
  };
  return (
    <div className="wishlistContainer">
      {isLoading === "adding" ? <Toast message="Adding to Cart" /> : null}
      {isLoading === "removing from wishlist" ? (
        <Toast message="Removing from Wishlist" />
      ) : null}
      <h1>WishList</h1>
      <div className="wishList">
        {products.map((product) => {
          const { _id, name, price, isWishlist, img, inCart, inStock } =
            product;
          return (
            <div key={_id}>
              {isWishlist && (
                <div className="ecommerceCard" key={_id}>
                  {!inStock && (
                    <div className="outOfStockCard">
                      <h2>Out of Stock</h2>
                    </div>
                  )}
                  <div className="cardImage">
                    <img src={img} alt="product" />
                  </div>
                  <div className="cardBody">
                    <p>{name}</p>
                    <div className="cardPrice">
                      <h4>₹ {price}</h4>
                    </div>
                  </div>
                  <div className="cardFooter">
                    <button
                      className="btn outline wishList"
                      onClick={() => removeFromWishlist(_id)}
                    >
                      Remove
                    </button>
                    {inCart ? (
                      <Link to="/cart">
                        <button className="actionBtn">Go to Cart</button>
                      </Link>
                    ) : (
                      <button className="btn" onClick={() => addToCart(_id)}>
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishList;
