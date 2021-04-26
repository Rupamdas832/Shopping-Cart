import axios from 'axios';
import React from 'react'
import { useStore, useUser } from '../Store';


export const CartItem = ({cartItem}) => {
    
    const {_id, name, price, quantity, isWishlist, img} = cartItem;
    const {storeDispatch} = useStore()

    const {userState} = useUser()
    const {user} = userState

    const toggleWishlist = async (_id) => {
        storeDispatch({type: "IS_LOADING", payload: "wishlisting"})
            try {
                const response = await axios.post(`https://Shopping-Cart-Server.rupamdas.repl.co/wishlist/${user.wishlistId}`, {
                    "productId" : _id
                })
                if(response.status === 201){
                    storeDispatch({type: "ADD_TO_WISHLIST", payload: _id})
                }
            } catch (error) {
                console.log(error)
            }
            finally{
                storeDispatch({type: "IS_LOADING", payload: "success"})
            }
        removeItem(_id)
    }

    const removeItem = (_id) => {
        async function fetchData() {
            storeDispatch({type: "IS_LOADING", payload: "removing"})
            try {
                const response = await axios.delete(`https://Shopping-Cart-Server.rupamdas.repl.co/cart/${user.cartId}/${_id}`)
                if(response.status === 202){
                    storeDispatch({type: "REMOVE_FROM_CART", payload: _id})
                } 
            } catch (error) {
                console.log(error.response.data)
            }
            finally{
                storeDispatch({type: "IS_LOADING", payload: "success"})
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
                        <button className="btn outline" onClick={() => storeDispatch({type: "DECREASE_COUNT", payload: _id})}>-</button>
                        {quantity}
                        <button className="btn outline" onClick={() => storeDispatch({type: "INCREASE_COUNT", payload: _id})}>+</button>
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
