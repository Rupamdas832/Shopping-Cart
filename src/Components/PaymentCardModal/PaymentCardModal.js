import React, { useState } from 'react'
import { useStore } from '../../Store'
import "./PaymentCardModal.css"

export const PaymentCardModal = ({isPaymentModalOpen, setIsPaymentModalOpen}) => {

    const [name, setName] = useState("")
    const [cardType, setCardType] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [cardNumber, setCardNumber] = useState("")

    const {storeDispatch} = useStore()

    const addPaymentCard = () => {
        const newPaymentCard = {
            name: name,
            cardType: cardType,
            month: month,
            year: year,
            cardNumber: cardNumber
        }
        storeDispatch({type: "ADD_PAYMENT_CARD", payload: newPaymentCard})
        setIsPaymentModalOpen(!isPaymentModalOpen)
    }
    return (
        <div className="modal">
            <div className="modalBox">
                <p style={{fontWeight: "600"}}>ADD NEW PAYMENT CARD</p>
                <div className="input">
                    <label>Card Type</label>
                    <input type="text" placeholder="Enter Card Type(Like Master/Visa)" onChange={(e) => setCardType(e.target.value)}/>
                </div>
                <div className="input">
                    <label>Card Number</label>
                    <input type="number" placeholder="Enter Card Number" onChange={(e) => setCardNumber(e.target.value)}/>
                </div>
                <div className="input">
                    <label>Name</label>
                    <input type="text" placeholder="Enter Name On Card" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="input date">
                    <label>Valid Upto</label>
                    <input type="number" placeholder="Month" onChange={(e) => setMonth(e.target.value)} className="inputSmall"/>
                    <input type="number" placeholder="Year" onChange={(e) => setYear(e.target.value)} className="inputSmall"/>
                </div>
                <div className="isLoginBtns">  
                    <button className="btn outline" onClick={() => setIsPaymentModalOpen(!isPaymentModalOpen)}>Cancel</button>
                    <button className="btn" onClick={addPaymentCard}>Add</button>
                </div>
            </div>
        </div>
    )
}
