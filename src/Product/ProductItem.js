import React from 'react'
import { useStore } from '../Store/context'
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

const ProductItem = ({product}) => {
    const {id, name, price, img, isWishlist, discount, inStock} = product
    const {dispatch} = useStore()

    const toggleWishlist = () => {
        {isWishlist ? (dispatch({type: "REMOVE_FROM_WISHLIST", payload: id})) : (dispatch({type: "ADD_TO_WISHLIST", payload: id}))}  
    }

    return (
        <div className="ecommerceCard">
                {!inStock && <div className="outOfStockCard">
                    <h2>Out of Stock</h2>
                </div>}
                <div className="cardImg">
                    <img src={img} alt="product"/>
                </div>
                <div className="cardBody">
                    <p>{name}</p>
                <div className="cardPrice">
                    <h4>₹ {price}</h4>
                    <h5>{discount}% off</h5>
                </div>
                </div>
                <div className="cardFooter">
                    <button className="btn outline" onClick={() => toggleWishlist(id)}>{isWishlist ? <FcLike/> : <FcLikePlaceholder/>}</button>
                    <button className="btn" onClick={() => dispatch({type: "ADD_TO_CART", payload: product})}>Add to Cart</button>
                </div>   
            </div>
    )
}

export default ProductItem
