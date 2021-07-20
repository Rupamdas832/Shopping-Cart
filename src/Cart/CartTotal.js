import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../Store";

export const CartTotal = () => {
  const { storeState } = useStore();
  const { cart, products } = storeState;

  const getTotal = () => {
    let sum = 0;
    let activeCartItems = cart.filter((item) => item.status === true);
    activeCartItems.map((item) => {
      return products.map((product) => {
        if (product._id === item._id) {
          return (sum = sum + parseInt(product.price) * item.quantity);
        }
        return product;
      });
    });
    return sum;
  };

  const TotalAfterDiscount = () => {
    if (getTotal() === 0) {
      return 0;
    } else return getTotal(cart) - 40;
  };

  const getCartItems = (cart) => {
    const activeItems = cart.filter((item) => item.status === true);
    return activeItems.length;
  };

  return (
    <div className="cartPriceDetails">
      <h4>PRICE DETAILS({getCartItems(cart)} items)</h4>
      <div className="price">
        <p>Price</p>
        <p>₹{getTotal()}</p>
      </div>
      <div className="price">
        <p>Discount</p>
        <p style={{ color: "green" }}>-₹40</p>
      </div>
      <div className="price">
        <p>Delivery Charges</p>
        <p style={{ color: "green" }}>FREE</p>
      </div>
      <div className="price total">
        <h5>Total Amount</h5>
        <p>₹{TotalAfterDiscount()}</p>
      </div>
      <Link
        to="/checkout"
        state={{
          price: TotalAfterDiscount(),
          cartItems: cart.filter((item) => item.status === true),
        }}
      >
        <button className="actionBtn cart">Checkout</button>
      </Link>
    </div>
  );
};
