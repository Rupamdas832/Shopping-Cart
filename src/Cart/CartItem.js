import axios from 'axios';
import React from 'react'
import { useStore } from '../Store/storeContext'

export const CartItem = ({cartItem}) => {
    
    const {_id, name, price, quantity, isWishlist, img} = cartItem;
    const {dispatch} = useStore()

    const toggleWishlist = (_id) => {
        {isWishlist ? (dispatch({type: "REMOVE_FROM_WISHLIST", payload: _id})) : (dispatch({type: "ADD_TO_WISHLIST", payload: _id}))}
        dispatch({type: "REMOVE_FROM_CART", payload: _id})
    }

    const removeItem = (_id) => {
        async function fetchData() {
            dispatch({type: "IS_LOADING", payload: "removing"})
            try {
                const response = await axios.delete(`/api/cart/${_id}`)
                if(response.status === 204){
                    dispatch({type: "REMOVE_FROM_CART", payload: _id})
                } 
            } catch (error) {
                console.log(error)
            }
            finally{
                dispatch({type: "IS_LOADING", payload: "success"})
            }
        }
        fetchData();
    }

    return (
        <div className="flatCard small" key={_id}>
            <div className="imgFlat small">
                <img src={img} alt="cart"/>
            </div>
            <div className="detailFlat small">
                <h2>{name}</h2>
                <div className="priceFlat small">
                    <h4>₹{price}</h4>
                    <div>
                        <button className="btn outline" onClick={() => dispatch({type: "DECREASE_COUNT", payload: _id})}>-</button>
                        {quantity}
                        <button className="btn outline" onClick={() => dispatch({type: "INCREASE_COUNT", payload: _id})}>+</button>
                    </div>
                    
                </div>
                <div className="btnsFlat small">
                    <button className="btn outline cart" disabled={isWishlist} onClick={() => toggleWishlist(_id)}>{isWishlist ? "Wishlisted" : "Move To Wishlist"}</button>
                    <button className="btn cart" onClick={() => removeItem(_id)}>Remove</button>
                </div>
            </div>
        </div>
    )
}
