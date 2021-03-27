import React, { useEffect, useReducer, useState } from 'react'
import Products from '../Assets/Products'
import { useCart } from './CartContext'


const Cart = () => {
    const {state, dispatch} = useCart()

    const getTotal = (array) => {
        return array.reduce((total, {price,quantity}) => total + price*quantity,0)
    }

    return (
        <div>
            <h1>Cart</h1>
            {state.map(cart => {
                return <div className="ecommerceCard" key={cart.id}>
                <div className="cardBody">
                    <p>{cart.name}</p>
                <div className="cardPrice">
                    <h4>{cart.price}</h4>
                    <button className="btn unstyled" onClick={() => dispatch({type: "DEC", payload: cart.id})}>-</button>
                    {cart.quantity}
                    <button className="btn unstyled" onClick={() => dispatch({type: "INC", payload: cart.id})}>+</button>
                </div>
                </div>
                <div className="cardFooter">
                    <button className="btn outline" onClick={() => dispatch({type: "WISHLIST", payload: cart.id})}><i class="far fa-heart"></i></button>
                    <button className="btn" onClick={() => dispatch({type: "REMOVE", payload: cart.id})}>Remove</button>
                </div>   
            </div>
            })}
            <h1>Total :- {getTotal(state)}</h1>
        </div>
    )
}

export default Cart
