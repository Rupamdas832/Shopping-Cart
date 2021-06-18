import axios from "axios";
import React, { useState } from "react";
import { v4 } from "uuid";
import { useStore, useUser } from "../../Store";
import "./PaymentCardModal.css";
import { URL } from "../../Api/apiURL";

export const PaymentCardModal = ({
  isPaymentModalOpen,
  setIsPaymentModalOpen,
}) => {
  const [name, setName] = useState("");
  const [cardType, setCardType] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const { storeDispatch } = useStore();
  const { userState } = useUser();
  const { token } = userState;

  const addPaymentCard = async () => {
    storeDispatch({ type: "IS_LOADING", payload: "adding card" });
    try {
      const {
        status,
        data: { paymentCards },
      } = await axios.post(
        `${URL}/user/paymentCard`,
        {
          ownerName: name,
          cardType,
          validMonth: month,
          validYear: year,
          cardNumber,
        },
        {
          headers: { Authorization: token },
        }
      );
      if (status === 201) {
        storeDispatch({ type: "ADD_PAYMENT_CARD", payload: paymentCards });
      }
    } catch (error) {
      console.log(error);
    } finally {
      storeDispatch({ type: "IS_LOADING", payload: "success" });
    }

    setIsPaymentModalOpen(!isPaymentModalOpen);
  };
  return (
    <div className="modal">
      <div className="modalBox">
        <p style={{ fontWeight: "600" }}>ADD NEW PAYMENT CARD</p>
        <div className="input">
          <label>Card Type</label>
          <input
            type="text"
            placeholder="Enter Card Type(Like Master/Visa)"
            onChange={(e) => setCardType(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Card Number</label>
          <input
            type="number"
            placeholder="Enter Card Number"
            maxLength={16}
            size={16}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Name On Card"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input date">
          <label>Valid Upto</label>
          <input
            type="number"
            placeholder="Month"
            maxLength={2}
            size={2}
            onChange={(e) => setMonth(e.target.value)}
            className="inputSmall"
          />
          <input
            type="number"
            placeholder="Year"
            maxLength={2}
            size={2}
            onChange={(e) => setYear(e.target.value)}
            className="inputSmall"
          />
        </div>
        <div className="isLoginBtns">
          <button
            className="btn outline"
            onClick={() => setIsPaymentModalOpen(!isPaymentModalOpen)}
          >
            Cancel
          </button>
          <button className="btn" onClick={addPaymentCard}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
