import React, { useEffect, useReducer, useState } from 'react'
import { useCart } from './CartContext'


const Cart = () => {
    const {state, dispatch} = useCart()

    const getTotal = (array) => {
        return array.reduce((total, {price,quantity}) => total + price*quantity,0)
    }
    return (
        <div>
            <h1>Cart</h1>
            {state.cart.map(cartItem => {
                const {id, name, price, quantity} = cartItem;
                return <div className="ecommerceCard" key={cartItem.id}>
                <div className="cardBody">
                    <p>{name}</p>
                <div className="cardPrice">
                    <h4>{price}</h4>
                    <button className="btn unstyled" onClick={() => dispatch({type: "DEC_COUNT", payload: id})}>-</button>
                    {quantity}
                    <button className="btn unstyled" onClick={() => dispatch({type: "INC_COUNT", payload: id})}>+</button>
                </div>
                </div>
                <div className="cardFooter">
                    <button className="btn outline" onClick={() => dispatch({type: "ADD_TO_WISHLIST", payload: cartItem})}><i class="far fa-heart"></i></button>
                    <button className="btn" onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: cartItem.id})}>Remove</button>
                </div>   
            </div>
            })}
            <h1>Total :- {getTotal(state.cart)}</h1>
        </div>
    )
}

export default Cart
