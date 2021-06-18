import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PrivateRoute, Step1, Step2, Toast } from "../../Components";
import { useCheckout, useStore, useUser } from "../../Store";
import { CartList } from "../CartList";
import "./Checkout.css";
import { URL } from "../../Api/apiURL";

export const Checkout = () => {
  const location = useLocation();
  const price = location.state.price;
  const cartItems = location.state.cartItems;

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const { checkoutState, checkoutDispatch } = useCheckout();
  const { cardSelected, addressSelected, address } = checkoutState;

  const { userState } = useUser();
  const { token } = userState;

  const { storeDispatch, storeState } = useStore();
  const { isLoading } = storeState;

  const changeStep = (action) => {
    if (action === "Increase") {
      if (step >= 2) {
        setStep(2);
      } else setStep(step + 1);
    } else if (action === "Decrease") {
      if (step <= 1) {
        setStep(1);
      } else setStep(step - 1);
    }
  };

  const placeOrderBtn = async () => {
    const newOrder = {
      totalPrice: price,
      address: address,
      cartItems: cartItems,
    };
    storeDispatch({ type: "IS_LOADING", payload: "checking out" });
    try {
      const { status } = await axios.delete(`${URL}/cart/checkout`, {
        headers: { Authorization: token },
      });
      if (status === 200) {
        storeDispatch({ type: "ADD_TO_ORDER", payload: newOrder });
        checkoutDispatch({ type: "DONE_CHECKOUT" });
        navigate("/order");
      }
    } catch (error) {
      console.log(error);
    } finally {
      storeDispatch({ type: "IS_LOADING", payload: "success" });
    }
  };

  return !price ? (
    <PrivateRoute path="/cart" element={<CartList />} />
  ) : (
    <div className="checkoutSection">
      {isLoading === "checking out" ? <Toast message="Placing Order" /> : null}
      <h2>Total Price : ₹{price}</h2>
      {cardSelected && addressSelected && (
        <button className="btn placeOrder" onClick={placeOrderBtn}>
          Place Order
        </button>
      )}
      <div className="stepsSection">
        <button onClick={() => changeStep("Decrease")} className="btn outline">
          Back
        </button>
        <div className="eachSteps">
          <p className={step === 1 ? "onStep" : ""}>1</p>
          <p>------</p>
          <p className={step === 2 ? "onStep" : ""}>2</p>
        </div>
        <button onClick={() => changeStep("Increase")} className="btn outline">
          Next
        </button>
      </div>
      <div>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
      </div>
    </div>
  );
};
