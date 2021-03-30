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
                        return <CartItem cartItem={cartItem}/>
                    })}
                </div>
                <div className="cartTotal">
                    <div className="cartPriceDetails">
                        <h4>PRICE DETAILS</h4>
                        <p>Price ₹{getTotal(state.cart)}</p>
                        <p>Discount -₹40</p>
                        <p>Delivery Charges  FREE</p>
                        <h5>Total Amount ₹{getTotal(state.cart)}</h5>
                        <button className="actionBtn">Checkout</button>
                    </div>  
                </div>
            </div>
            
        </div>
    )
}

export default CartList
