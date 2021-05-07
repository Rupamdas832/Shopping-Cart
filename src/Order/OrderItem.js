import React from 'react'
import "./OrderItem.css"

export const OrderItem = ({totalPrice, shippedAddress, cartItems}) => {
    const {_id, senderName, address, pincode, mobile, city, state} = shippedAddress
    return (
        <div className="card orderItem">
            <div className="cardBody orderItem">
                <div>
                    {cartItems && cartItems.map(item => {
                        const {_id,name,price,quantity} = item
                        return <div className="orderItemName" key={_id}>
                                    <p>{name}</p>
                                    <p>{quantity}</p>
                                    <p>₹ {price}</p>
                                </div>
                    })}
                    <div className="orderItemName" style={{borderTop: "1px solid grey"}}>
                                    <p>Total</p>
                                    <p></p>
                                    <p>₹ {totalPrice}</p>
                                </div>
                </div>
                <div className="cardBody address">
                    <p>Shipping Address</p>
                    <p style={{fontWeight: "700"}}>{senderName}</p>
                    <p>{address}</p>
                    <p><span>{city}</span> , <span>{state}</span> - {pincode}</p>
                    <p>{mobile}</p>
                </div>
            </div>
            <div className="cardFooter">
                <button className="btn outline">Delete</button>
                <button className="actionBtn">Details...</button>
            </div>   
        </div>
    )
}
