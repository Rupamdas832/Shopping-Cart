import React from 'react'
import { useCart } from '../Cart/CartContext'

const WishList = () => {

    const {state, dispatch} = useCart()
    return (
        <div>
            <h1>WishList</h1>
            {state.products.map(product => {
                const {id, name, price, isWishlist} = product;
                return (isWishlist && <div className="ecommerceCard" key={id}>
                <div className="cardBody">
                    <p>{name}</p>
                <div className="cardPrice">
                    <h4>{price}</h4>
                </div>
                </div>
                <div className="cardFooter">
                    <button className="btn" onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: id})}>Remove</button>
                </div>   
            </div>)
            })}
        </div>
    )
}

export default WishList
