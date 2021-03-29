import React from 'react'
import { useCart } from './CartContext'

const CartItem = ({cartItem}) => {
    
    const {id, name, price, quantity, isWishlist} = cartItem;
    const {dispatch} = useCart()

    const toggleWishlist = (id) => {
        {isWishlist ? (dispatch({type: "REMOVE_FROM_WISHLIST", payload: id})) : (dispatch({type: "ADD_TO_WISHLIST", payload: id}))}
        dispatch({type: "REMOVE_FROM_CART", payload: id})
    }

    return (
        <div className="ecommerceCard" key={id}>
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
                    <button className="btn outline" onClick={() => toggleWishlist(id)}>Move To Wishlist</button>
                    <button className="btn" onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: id})}>Remove</button>
                </div>   
            </div>
    )
}

export default CartItem
