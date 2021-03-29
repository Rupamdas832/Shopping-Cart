import React, { useEffect, useReducer, useState } from 'react'
import { useCart } from './CartContext'
import CartItem from './CartItem';


const CartList = () => {
    const {state, dispatch} = useCart()

    const getTotal = (array) => {
        return array.reduce((total, {price,quantity}) => total + price*quantity,0)
    }
    return (
        <div>
            <h1>Cart</h1>
            {state.cart.map(cartItem => {
                return <CartItem cartItem={cartItem}/>
            })}
            <h1>Total :- {getTotal(state.cart)}</h1>
        </div>
    )
}

export default CartList
