import React from 'react'
import { useStore } from '../Store/context'

const CartItem = ({cartItem}) => {
    
    const {id, name, price, quantity, isWishlist, img} = cartItem;
    const {dispatch} = useStore()

    const toggleWishlist = (id) => {
        {isWishlist ? (dispatch({type: "REMOVE_FROM_WISHLIST", payload: id})) : (dispatch({type: "ADD_TO_WISHLIST", payload: id}))}
        dispatch({type: "REMOVE_FROM_CART", payload: id})
    }

    return (
        <div className="flatCard small" key={id}>
            <div className="imgFlat small">
                <img src={img} alt="cart"/>
            </div>
            <div className="detailFlat small">
                <h2>{name}</h2>
                <div className="priceFlat small">
                    <h4>₹{price}</h4>
                    <div>
                        <button className="btn outline" onClick={() => dispatch({type: "DEC_COUNT", payload: id})}>-</button>
                        {quantity}
                        <button className="btn outline" onClick={() => dispatch({type: "INC_COUNT", payload: id})}>+</button>
                    </div>
                    
                </div>
                <div className="btnsFlat small">
                    <button className="btn outline cart" disabled={isWishlist} onClick={() => toggleWishlist(id)}>{isWishlist ? "Wishlisted" : "Move To Wishlist"}</button>
                    <button className="btn cart" onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: id})}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
