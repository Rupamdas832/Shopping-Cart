import axios from "axios";
import React, { useState } from "react";
import { v4 } from "uuid";
import { useStore, useUser } from "../../Store";
import "./AddressModal.css";
import { URL } from "../../Api/apiURL";

export const AddressModal = ({ isAddressModalOpen, setIsAddressModalOpen }) => {
  const [name, setName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const { storeDispatch } = useStore();
  const { userState } = useUser();
  const { token } = userState;

  const addAddress = async () => {
    storeDispatch({ type: "IS_LOADING", payload: "adding address" });
    try {
      const {
        status,
        data: { address },
      } = await axios.post(
        `${URL}/user/address`,
        {
          name,
          address: newAddress,
          pincode,
          mobile,
          city,
          state,
        },
        {
          headers: { Authorization: token },
        }
      );
      if (status === 201) {
        storeDispatch({ type: "ADD_ADDRESS", payload: address });
      }
    } catch (error) {
      console.log(error);
    } finally {
      storeDispatch({ type: "IS_LOADING", payload: "success" });
    }

    setIsAddressModalOpen(!isAddressModalOpen);
  };
  return (
    <div className="modal">
      <div className="modalBox">
        <p style={{ fontWeight: "600" }}>ADD NEW ADDRESS</p>
        <div className="input">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Address</label>
          <input
            type="text"
            placeholder="Enter Address(House No, Building, Street"
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Pincode</label>
          <input
            type="number"
            placeholder="Enter Pincode"
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Mobile</label>
          <input
            type="number"
            placeholder="Enter Mobile Number"
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="input">
          <label>City</label>
          <input
            type="text"
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="input">
          <label>State</label>
          <input
            type="text"
            placeholder="Enter State"
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="isLoginBtns">
          <button
            className="btn outline"
            onClick={() => setIsAddressModalOpen(!isAddressModalOpen)}
          >
            Cancel
          </button>
          <button className="btn" onClick={addAddress}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
