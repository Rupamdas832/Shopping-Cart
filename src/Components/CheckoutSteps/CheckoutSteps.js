import React, { useState } from "react";
import { useCheckout, useStore } from "../../Store";
import { AddressModal } from "../AddressModal/AddressModal";
import { PaymentCardModal } from "../PaymentCardModal/PaymentCardModal";
import "./CheckoutSteps.css";
export const Step1 = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const { storeState } = useStore();
  const { address } = storeState;

  const { checkoutState, checkoutDispatch } = useCheckout();
  const { addressSelected } = checkoutState;
  return (
    <div className="checkoutStep1">
      {isAddressModalOpen && (
        <AddressModal
          setIsAddressModalOpen={setIsAddressModalOpen}
          isAddressModalOpen={isAddressModalOpen}
        />
      )}
      <h3>Select Delivery Address</h3>
      <ul>
        {address &&
          address.map((item) => {
            const { _id, senderName, address, pincode, mobile, city, state } =
              item;
            return (
              <li
                key={_id}
                onClick={() =>
                  checkoutDispatch({ type: "SELECT_ADDRESS", payload: item })
                }
              >
                <input
                  type="radio"
                  name="address"
                  checked={addressSelected && addressSelected === _id}
                />
                <div className="card address">
                  <div className="cardBody address">
                    <p style={{ fontWeight: "700" }}>{senderName}</p>
                    <p>{address}</p>
                    <p>
                      <span>{city}</span> , <span>{state}</span> - {pincode}
                    </p>
                    <p>{mobile}</p>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <div style={{ margin: "1rem" }}>
        <button
          className="btn outline address"
          onClick={() => setIsAddressModalOpen(!isAddressModalOpen)}
        >
          +Add New Address
        </button>
      </div>
    </div>
  );
};
export const Step2 = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { storeState } = useStore();
  const { paymentCards } = storeState;

  const { checkoutState, checkoutDispatch } = useCheckout();
  const { cardSelected } = checkoutState;
  return (
    <div className="checkoutStep1">
      {isPaymentModalOpen && (
        <PaymentCardModal
          setIsPaymentModalOpen={setIsPaymentModalOpen}
          isPaymentModalOpen={isPaymentModalOpen}
        />
      )}
      <h3>Payment Details</h3>
      <ul>
        {paymentCards &&
          paymentCards.map((item) => {
            const { _id, name, cardType, cardNumber, validMonth, validYear } =
              item;
            {
              /*const hashCardNumber = new Array(cardNumber.length - 3).join("*") + cardNumber.slice(-4)*/
            }
            return (
              <li
                key={_id}
                onClick={() =>
                  checkoutDispatch({ type: "SELECT_CARD", payload: item })
                }
              >
                <input
                  type="radio"
                  name="paymentCard"
                  checked={cardSelected && cardSelected === _id}
                />
                <div className="card debit">
                  <div className="cardBody debit">
                    <p style={{ fontWeight: "700" }}>
                      <span style={{ marginRight: "5rem" }}>{cardType}</span>
                      {cardNumber}
                    </p>
                    <p>
                      {name}{" "}
                      <span style={{ marginLeft: "5rem" }}>
                        {validMonth}/{validYear}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <div style={{ margin: "1rem" }}>
        <button
          className="btn outline address"
          onClick={() => setIsPaymentModalOpen(!isPaymentModalOpen)}
        >
          +Add New Card
        </button>
      </div>
    </div>
  );
};
