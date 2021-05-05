import React, { useState } from 'react'
import "./Profile.css"
import { useStore, useUser } from '../../Store'
import { AddressModal, PaymentCardModal } from '../../Components'



export const Profile = () => {

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

    const {userState} = useUser()
    const {user} = userState

    const {storeState} = useStore()
    const {address, paymentCards} = storeState

    return (
        <div className="profileContainer">
            {isAddressModalOpen && <AddressModal setIsAddressModalOpen={setIsAddressModalOpen} isAddressModalOpen={isAddressModalOpen}/>}
            {isPaymentModalOpen && <PaymentCardModal setIsPaymentModalOpen={setIsPaymentModalOpen} isPaymentModalOpen={isPaymentModalOpen}/>}
            <div className="profileLeftSection">
                <p>Hii <span style={{color: "var(--blue)"}}>{user.name.toUpperCase()}</span></p>
                <div className="profileDetail">
                    <div className="input">
                        <label>Name</label>
                        <input placeholder="Enter name" value={user.name}/>
                    </div>
                    <div className="input">
                        <label>Email</label>
                        <input placeholder="Enter name" value={user.email}/>
                    </div>
                    <div className="input">
                        <label>Password</label>
                        <input placeholder="Enter name" type="password" value={user.password}/>
                    </div>
                </div>
                <div className="addressSectionHeader">
                    <p>Card Details</p>
                    <button className="btn outline address" onClick={() => setIsPaymentModalOpen(!isPaymentModalOpen)}>+Add New Card</button>
                </div>
                <div className="cardDetails">
                {paymentCards && paymentCards.map((item,idx) => {
                    const {name, cardType, cardNumber, month, year} = item
                    return <div className="card debit" key={idx}>
                                <div className="cardBody debit">
                                    <p style={{fontWeight: "700"}}><span style={{marginRight: "5rem"}}>{cardType}</span>{cardNumber}</p>
                                    <p>{name} <span style={{marginLeft: "5rem"}}>{month}/{year}</span></p>
                                </div>
                                <div className="cardFooter debit">
                                    <button className="btn unstyled debit">Remove</button>
                                    <button className="btn unstyled debit">Edit</button>
                                </div>   
                            </div>
                })}
                </div>
            </div>
            <div className="profileRightSection">
                <div className="addressSectionHeader">
                    <p>Address</p>
                    <button className="btn outline address" onClick={() => setIsAddressModalOpen(!isAddressModalOpen)}>+Add New Address</button>
                </div>
                {address && address.map((item,idx) => {
                    const {senderName, address, pincode, mobile, city, state} = item
                    return <div className="card address" key={idx}>
                                <div className="cardBody address">
                                    <p style={{fontWeight: "700"}}>{senderName}</p>
                                    <p>{address}</p>
                                    <p><span>{city}</span> , <span>{state}</span> - {pincode}</p>
                                    <p>{mobile}</p>
                                </div>
                                <div className="cardFooter address">
                                    <button className="btn unstyled address">Remove</button>
                                    <button className="btn unstyled address">Edit</button>
                                </div>   
                            </div>
                })}
                
            </div>
        </div>
    )
}
