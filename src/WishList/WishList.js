import React from 'react'
import "./WishList.css"
import { useStore } from '../Store/context'

const WishList = () => {

    const {state, dispatch} = useStore()
    return (
        <div className="wishlistContainer">
            <h1>WishList</h1>
            <div className="wishList">
                {state.products.map(product => {
                    const {id, name, price, isWishlist, img, inCart} = product;
                    return <div key={id}>
                    {isWishlist && <div className="ecommerceCard" key={id}>
                    <div className="cardImg">
                        <img src={img} alt="product"/>
                    </div>
                    <div className="cardBody">
                        <p>{name}</p>
                    <div className="cardPrice">
                        <h4>₹ {price}</h4>
                    </div>
                    </div>
                    <div className="cardFooter">
                        <button className="btn outline" onClick={() => dispatch({type: "REMOVE_FROM_WISHLIST", payload: id})}>Remove</button>
                        <button className="btn" disabled={inCart} onClick={() => dispatch({type: "ADD_TO_CART", payload: product})}>{inCart ? "In Cart" : "Add To Cart"}</button>
                    </div>   
                </div>}
                    </div> 
                })}
            </div>
            
        </div>
    )
}

export default WishList
