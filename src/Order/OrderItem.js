import React from "react";
import { useStore } from "../Store";
import "./OrderItem.css";

export const OrderItem = ({ totalPrice, shippedAddress, cartItems }) => {
  const { address, pincode, mobile, city, state } = shippedAddress;
  const { storeState } = useStore();
  const { products } = storeState;

  return (
    <div className="card orderItem">
      <div className="cardBody orderItem">
        <div>
          {cartItems &&
            cartItems.map((item) => {
              const { _id, quantity } = item;
              const productFound = products.find(
                (product) => product._id === item._id
              );
              if (productFound) {
                return (
                  <div className="orderItemName" key={_id}>
                    <p>{productFound.name}</p>
                    <p>{quantity}</p>
                    <p>₹ {productFound.price}</p>
                  </div>
                );
              }
            })}
          <div
            className="orderItemName"
            style={{ borderTop: "1px solid grey" }}
          >
            <p>Total</p>
            <p></p>
            <p>₹ {totalPrice}</p>
          </div>
        </div>
        <div className="cardBody address">
          <p>Shipping Address</p>
          <p style={{ fontWeight: "700" }}>{shippedAddress.name}</p>
          <p>{address}</p>
          <p>
            <span>{city}</span> , <span>{state}</span> - {pincode}
          </p>
          <p>{mobile}</p>
        </div>
      </div>
      <div className="cardFooter">
        <button className="btn outline">Delete</button>
        <button className="actionBtn">Details...</button>
      </div>
    </div>
  );
};
