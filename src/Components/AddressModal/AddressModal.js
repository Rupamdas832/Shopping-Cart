import React, { useState } from 'react'
import { useStore } from '../../Store'
import "./AddressModal.css"

export const AddressModal = ({isAddressModalOpen, setIsAddressModalOpen}) => {

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState("")
    const [mobile, setMobile] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")

    const {storeDispatch} = useStore()

    const addAddress = () => {
        const newAddress = {
            senderName: name,
            address: address,
            pincode: pincode,
            mobile: mobile,
            city: city,
            state: state
        }
        storeDispatch({type: "ADD_ADDRESS", payload: newAddress})
        setIsAddressModalOpen(!isAddressModalOpen)
    }
    return (
        <div className="modal">
            <div className="modalBox">
                <p style={{fontWeight: "600"}}>ADD NEW ADDRESS</p>
                <div className="input">
                    <label>Name</label>
                    <input type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="input">
                    <label>Address</label>
                    <input type="text" placeholder="Enter Address(House No, Building, Street" onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className="input">
                    <label>Pincode</label>
                    <input type="number" placeholder="Enter Pincode" onChange={(e) => setPincode(e.target.value)}/>
                </div>
                <div className="input">
                    <label>Mobile</label>
                    <input type="number" placeholder="Enter Mobile Number" onChange={(e) => setMobile(e.target.value)}/>
                </div>
                <div className="input">
                    <label>City</label>
                    <input type="text" placeholder="Enter City" onChange={(e) => setCity(e.target.value)}/>
                </div>
                <div className="input">
                    <label>State</label>
                    <input type="text" placeholder="Enter State" onChange={(e) => setState(e.target.value)}/>
                </div>
                <div className="isLoginBtns">  
                    <button className="btn outline" onClick={() => setIsAddressModalOpen(!isAddressModalOpen)}>Cancel</button>
                    <button className="btn" onClick={addAddress}>Add</button>
                </div>
            </div>
        </div>
    )
}
