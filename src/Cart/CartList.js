import React from 'react'
import { useStore } from '../Store/context'
import CartItem from './CartItem';
import "./CartList.css"

const CartList = () => {
    const {state} = useStore()

    const getTotal = (array) => {
        return array.reduce((total, {price,quantity}) => total + price*quantity,0)
    }
    return (
        <div className="cartContainer">
            <h1>Cart</h1>
            <div className="cartListContainer">
                <div className="cartList">
                    {state.cart.length === 0 ? <p>Your Shopping bag is empty!</p> : null}
                    {state.cart.map(cartItem => {
                        return <CartItem cartItem={cartItem} key={cartItem.id}/>
                    })}
                </div>
                <div className="cartTotal">
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
                            <p>₹{parseInt(getTotal(state.cart))- 40}</p>
                        </div>
                        <button className="actionBtn">Checkout</button>
                    </div>  
                </div>
            </div>
            
        </div>
    )
}

export default CartList
