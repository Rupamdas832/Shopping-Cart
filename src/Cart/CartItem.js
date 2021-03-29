import React from 'react'
import { useCart } from './CartContext'
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

const CartItem = ({cartItem}) => {
    
    const {id, name, price, quantity, isWishlist} = cartItem;
    const {dispatch} = useCart()

    return (
        <div className="ecommerceCard" key={cartItem.id}>
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
                    <button className="btn outline" onClick={() => dispatch({type: "ADD_TO_WISHLIST", payload: cartItem})}>{isWishlist ? <FcLike/> : <FcLikePlaceholder/>}</button>
                    <button className="btn" onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: cartItem.id})}>Remove</button>
                </div>   
            </div>
    )
}

export default CartItem
