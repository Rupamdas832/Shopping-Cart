import React from 'react'
import { useStore } from '../../Store'

export const Step1 = () => {

    const {storeState} = useStore()
    const {address} = storeState
    return (
        <div>
            <h3>Select Delivery Address</h3>
            <ul>
             
            {address && address.map((item,idx) => {
                const {senderName, address, pincode, mobile, city, state} = item
                return <li>
                            <input type="radio" name="address"/>
                            <div className="card address" key={idx}>
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
    return (
        <div>
            <h3>Payment Details</h3>
            {paymentCards && paymentCards.map((item,idx) => {
                const {name, cardType, cardNumber, month, year} = item
                return <li>
                            <input type="radio" name="paymentCard"/>
                            <div className="card debit" key={idx}>
                                <div className="cardBody debit">
                                    <p style={{fontWeight: "700"}}><span style={{marginRight: "5rem"}}>{cardType}</span>{cardNumber}</p>
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

