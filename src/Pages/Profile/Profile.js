import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useStore, useUser } from "../../Store";
import { AddressModal, PaymentCardModal, Toast } from "../../Components";
import axios from "axios";
import { URL } from "../../Api/apiURL";

export const Profile = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { userState } = useUser();
  const { user, token } = userState;

  const { storeState, storeDispatch } = useStore();
  const { address, paymentCards, isLoading } = storeState;

  const removeCard = async (paymentCardId) => {
    storeDispatch({ type: "IS_LOADING", payload: "removing card" });
    try {
      const {
        status,
        data: { paymentCards },
      } = await axios.delete(`${URL}/user/paymentCard`, {
        headers: { Authorization: token },
        data: {
          paymentCardId,
        },
      });
      if (status === 200) {
        storeDispatch({ type: "REMOVE_PAYMENT_CARD", payload: paymentCards });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeAddress = async (addressId) => {
    storeDispatch({ type: "IS_LOADING", payload: "removing address" });
    try {
      const {
        status,
        data: { address },
      } = await axios.delete(`${URL}/user/address`, {
        headers: { Authorization: token },
        data: {
          addressId,
        },
      });
      if (status === 200) {
        storeDispatch({ type: "REMOVE_ADDRESS", payload: address });
      }
    } catch (error) {
      console.log(error);
    } finally {
      storeDispatch({ type: "IS_LOADING", payload: "success" });
    }
  };

  return (
    <div className="profileContainer">
      {isLoading === "adding address" ? (
        <Toast message="Adding Address" />
      ) : null}
      {isLoading === "removing address" ? (
        <Toast message="Removing Address" />
      ) : null}
      {isLoading === "adding card" ? <Toast message="Adding Card" /> : null}
      {isLoading === "removing card" ? <Toast message="Removing Card" /> : null}
      {isAddressModalOpen && (
        <AddressModal
          setIsAddressModalOpen={setIsAddressModalOpen}
          isAddressModalOpen={isAddressModalOpen}
        />
      )}
      {isPaymentModalOpen && (
        <PaymentCardModal
          setIsPaymentModalOpen={setIsPaymentModalOpen}
          isPaymentModalOpen={isPaymentModalOpen}
        />
      )}
      <div className="profileLeftSection">
        <p>
          Hey{" "}
          <span style={{ color: "var(--blue)" }}>
            {user.name.toUpperCase()}
          </span>
        </p>
        <div className="profileDetail">
          <div className="input">
            <label>Name</label>
            <input placeholder="Enter name" value={user.name} readOnly />
          </div>
          <div className="input">
            <label>Email</label>
            <input placeholder="Enter name" value={user.email} readOnly />
          </div>
        </div>
        <div className="addressSectionHeader">
          <p>Card Details</p>
          <button
            className="btn outline address"
            onClick={() => setIsPaymentModalOpen(!isPaymentModalOpen)}
          >
            +Add New Card
          </button>
        </div>
        <div className="cardDetails">
          {paymentCards &&
            paymentCards.map((item) => {
              const { name, cardType, cardNumber, validMonth, validYear, _id } =
                item;
              {
                /*const hashCardNumber =
                new Array(cardNumber.length - 3).join("*") +
              cardNumber.slice(-4);*/
              }

              return (
                <div className="card debit" key={_id}>
                  <div className="cardBody debit">
                    <p style={{ fontWeight: "700" }}>
                      <span style={{ marginRight: "5rem" }}>{cardType}</span>
                      {cardNumber}
                    </p>
                    <p>
                      <span style={{ marginLeft: "5rem" }}>
                        {validMonth}/{validYear}
                      </span>
                    </p>
                  </div>
                  <div className="cardFooter debit">
                    <button
                      className="btn unstyled debit"
                      onClick={() => removeCard(_id)}
                    >
                      Remove
                    </button>
                    {/*<button className="btn unstyled debit">Edit</button>*/}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="profileRightSection">
        <div className="addressSectionHeader">
          <p>Address</p>
          <button
            className="btn outline address"
            onClick={() => setIsAddressModalOpen(!isAddressModalOpen)}
          >
            +Add New Address
          </button>
        </div>
        {address &&
          address.map((item) => {
            const { name, address, pincode, mobile, city, state, _id } = item;
            return (
              <div className="card address" key={_id}>
                <div className="cardBody address">
                  <p style={{ fontWeight: "700" }}>{name}</p>
                  <p>{address}</p>
                  <p>
                    <span>{city}</span> , <span>{state}</span> - {pincode}
                  </p>
                  <p>{mobile}</p>
                </div>
                <div className="cardFooter address">
                  <button
                    className="btn unstyled address"
                    onClick={() => removeAddress(_id)}
                  >
                    Remove
                  </button>
                  {/*<button className="btn unstyled address">Edit</button>*/}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
