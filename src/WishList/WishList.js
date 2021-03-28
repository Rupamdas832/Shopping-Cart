import React from 'react'
import { useCart } from '../Cart/CartContext'

const WishList = () => {

    const {state, dispatch} = useCart()
    return (
        <div>
            <h1>WishList</h1>
            {state.wishlist.map(wish => {
                return <div className="ecommerceCard" key={wish.id}>
                <div className="cardBody">
                    <p>{wish.name}</p>
                <div className="cardPrice">
                    <h4>{wish.price}</h4>
                </div>
                </div>
                <div className="cardFooter">
                    <button className="btn" onClick={() => dispatch({type: "REMOVE_FROM_CART", payload: wish.id})}>Remove</button>
                </div>   
            </div>
            })}
        </div>
    )
}

export default WishList
