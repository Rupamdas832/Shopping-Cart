import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Signup.css";
import { useStore, useUser } from "../Store";
import { Toast } from "../Components";
import axios from "axios";
import { URL } from "../Api/apiURL";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();

  const { storeState, storeDispatch } = useStore();
  const { isLoading } = storeState;

  const { userDispatch } = useUser();

  const fetchWishlist = async (user, token, cart) => {
    try {
      const {
        data: { wishlist },
        status,
      } = await axios.get(`${URL}/wishlist`, {
        headers: { authorization: token },
      });
      if (status === 200) {
        storeDispatch({ type: "LOAD_CART", payload: cart.products });
        storeDispatch({ type: "LOAD_WISHLIST", payload: wishlist.products });
        localStorage.setItem(
          "CartLoginUser",
          JSON.stringify({
            isUserLogin: true,
            token: token,
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            cart: cart.products,
            wishlist: wishlist.products,
            orders: [],
          })
        );
        navigate(state?.from ? state.from : "/");
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      storeDispatch({ type: "IS_LOADING", payload: "success" });
    }
  };

  const fetchCart = async (user, token) => {
    try {
      const {
        data: { cart },
        status,
      } = await axios.get(`${URL}/cart`, {
        headers: { authorization: token },
      });
      if (status === 200) {
        fetchWishlist(user, token, cart);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const signUpUser = async () => {
    storeDispatch({ type: "IS_LOADING", payload: "signup" });
    try {
      const {
        data: { user, token },
        status,
      } = await axios.post(`${URL}/signup`, {
        name: name,
        email: email,
        password: password,
      });
      if (status === 201) {
        userDispatch({ type: "LOAD_USER", payload: { user, token } });
        fetchCart(user, token);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="signup">
      {isLoading === "signup" ? <Toast message="Signing up..." /> : null}
      <div className="formCard">
        <h1>Signup</h1>
        <div className="formInput">
          <label>Name</label>
          <input
            placeholder="Type your name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="formInput">
          <label>Email</label>
          <input
            placeholder="Type your email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formInput">
          <label>Password</label>
          <input
            placeholder="Type your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="errorMessage">{error}</p>}
        <button className="formBtn" onClick={signUpUser}>
          Signup
        </button>
        <div className="redirectToSignup">
          <p>
            new to GradGrams! <Link to="/login"> Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
