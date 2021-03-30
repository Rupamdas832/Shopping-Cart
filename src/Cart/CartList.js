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
                    <p>Total :- {getTotal(state.cart)}</p>
                    <button className="actionBtn">Checkout</button>
                </div>
            </div>
            
        </div>
    )
}

export default CartList
