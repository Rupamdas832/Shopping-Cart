import React from 'react'
import { useStore } from '../Store/context'

const CartTotal = () => {

    const {state} = useStore();
    const getTotal = (array) => {
        return array.reduce((total, {price,quantity}) => total + parseInt(price)*quantity,0)
    }
    return (
        <div className="cartPriceDetails">
            <h4>PRICE DETAILS({state.cart.length} items)</h4>
            <div className="price">
                <p>Price</p>
                <p>₹{getTotal(state.cart)}</p>
            </div>
            <div className="price">
                <p>Discount</p>
                <p style={{color: "greenyellow"}}>-₹40</p>
            </div>
            <div className="price">
                <p>Delivery Charges</p>
                <p style={{color: "greenyellow"}}>FREE</p>
            </div>
            <div className="price total">
                <h5>Total Amount</h5>
                <p>₹{getTotal(state.cart)- 40}</p>
            </div>
            <button className="actionBtn">Checkout</button>
        </div>
    )
}

export default CartTotal
