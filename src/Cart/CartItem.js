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
        <div className="flatCard" key={id}>
            <div className="imgFlat">
                <img src={img} alt="cart"/>
            </div>
            <div className="detailFlat">
                <h2>{name}</h2>
                <div className="priceFlat">
                    <h4>₹{price}</h4>
                    <button className="btn unstyled" onClick={() => dispatch({type: "DEC_COUNT", payload: id})}>-</button>
                        {quantity}
                    <button className="btn unstyled" onClick={() => dispatch({type: "INC_COUNT", payload: id})}>+</button>
                </div>
                <div className="btnsFlat">
                    <button className="btn outline" onClick={() => toggleWishlist(id)}>Move To Wishlist</button>
                    <button className="btn" onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: id})}>Remove</button>
                </div>
            </div>
        </div>
        
    )
}

export default CartItem
