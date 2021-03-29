import React from 'react'
import { useCart } from './CartContext'
import CartItem from './CartItem';
import "./CartList.css"

const CartList = () => {
    const {state} = useCart()

    const getTotal = (array) => {
        return array.reduce((total, {price,quantity}) => total + price*quantity,0)
    }
    return (
        <div className="cartContainer">
            <h1>Cart</h1>
            <div className="cartListContainer">
                <div className="cartList">
                    {state.cart.map(cartItem => {
                        return <CartItem cartItem={cartItem}/>
                    })}
                </div>
                <div className="cartTotal">
                    <h1>Total :- {getTotal(state.cart)}</h1>
                </div>
            </div>
            
        </div>
    )
}

export default CartList
