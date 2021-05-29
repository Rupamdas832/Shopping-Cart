import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../Store";

export const CartTotal = () => {
  const { storeState } = useStore();
  const { cart, products } = storeState;

  const getTotal = () => {
    let sum = 0;
    cart.map((item) => {
      products.map((product) => {
        if (product._id === item._id) {
          return (sum = sum + parseInt(product.price) * item.quantity);
        }
        return product;
      });
    });
    return sum;
  };
  const TotalAfterDiscount = () => {
    return getTotal(cart) - 40;
  };

  return (
    <div className="cartPriceDetails">
      <h4>PRICE DETAILS({cart.length} items)</h4>
      <div className="price">
        <p>Price</p>
        <p>₹{getTotal()}</p>
      </div>
      <div className="price">
        <p>Discount</p>
        <p style={{ color: "greenyellow" }}>-₹40</p>
      </div>
      <div className="price">
        <p>Delivery Charges</p>
        <p style={{ color: "greenyellow" }}>FREE</p>
      </div>
      <div className="price total">
        <h5>Total Amount</h5>
        <p>₹{TotalAfterDiscount()}</p>
      </div>
      <Link
        to="/checkout"
        state={{ price: TotalAfterDiscount(), cartItems: cart }}
      >
        <button className="actionBtn cart">Checkout</button>
      </Link>
    </div>
  );
};
