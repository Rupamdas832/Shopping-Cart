import React from 'react'
import { useCheckout, useStore } from '../../Store'

export const Step1 = () => {

    const {storeState} = useStore()
    const {address} = storeState
    console.log(address)

    const {checkoutState, checkoutDispatch} = useCheckout()
    const {addressSelected} = checkoutState
    return (
        <div>
            <h3>Select Delivery Address</h3>
            <ul>
             
            {address && address.map((item) => {
                const {_id, senderName, address, pincode, mobile, city, state} = item
                return <li key={_id}>
                            <input type="radio" name="address" 
                                onChange={() => checkoutDispatch({type: "SELECT_ADDRESS", payload: item})} 
                                checked={addressSelected && addressSelected === _id}
                            />
                            <div className="card address">
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
                        </li>
            })}
               
            </ul>
        </div>
    )
}
export const Step2 = () => {
    const {storeState} = useStore()
    const {paymentCards} = storeState
    console.log(paymentCards)

    const {checkoutState, checkoutDispatch} = useCheckout()
    const {cardSelected} = checkoutState
    return (
        <div>
            <h3>Payment Details</h3>
            {paymentCards && paymentCards.map((item) => {
                const {_id,name, cardType, cardNumber, month, year} = item
                const hashCardNumber = new Array(cardNumber.length - 3).join("*") + cardNumber.slice(-4)
                return <li key={_id}>
                            <input type="radio" name="paymentCard" 
                                onChange={() => checkoutDispatch({type: "SELECT_CARD", payload: item})}  
                                checked={cardSelected && cardSelected === _id}
                            />
                            <div className="card debit">
                                <div className="cardBody debit">
                                    <p style={{fontWeight: "700"}}><span style={{marginRight: "5rem"}}>{cardType}</span>{hashCardNumber}</p>
                                    <p>{name} <span style={{marginLeft: "5rem"}}>{month}/{year}</span></p>
                                </div>
                                <div className="cardFooter debit">
                                    <button className="btn unstyled debit">Remove</button>
                                    <button className="btn unstyled debit">Edit</button>
                                </div>   
                            </div>
                        </li>
            })}
        </div>
    )
}

