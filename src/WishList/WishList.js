import React from 'react'
import { useCart } from '../Cart/CartContext'

const WishList = () => {

    const {state, dispatch} = useCart()
    return (
        <div>
            <h1>WishList</h1>
            {state.products.map(product => {
                const {id, name, price, isWishlist} = product;
                return <div>
                {isWishlist && <div className="ecommerceCard" key={id}>
                <div className="cardBody">
                    <p>{name}</p>
                <div className="cardPrice">
                    <h4>₹ {price}</h4>
                </div>
                </div>
                <div className="cardFooter">
                    <button className="btn outline" onClick={() => dispatch({type: "REMOVE_FROM_WISHLIST", payload: id})}>Remove</button>
                    <button className="btn" onClick={() => dispatch({type: "ADD_TO_CART", payload: product})}>Add to Cart</button>
                </div>   
            </div>}
                </div> 
            })}
        </div>
    )
}

export default WishList
