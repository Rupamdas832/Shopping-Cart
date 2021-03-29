import React from 'react'
import {useCart} from "../Cart/CartContext"
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

const ProductItem = ({product}) => {
    const {id, name, price, img, isWishlist} = product
    const {dispatch} = useCart()

    return (
        <div className="ecommerceCard">
                <div className="cardImg">
                    <img src={img}/>
                </div>
                <div className="cardBody">
                    <p>{name}</p>
                <div className="cardPrice">
                    <h4>{price}</h4>
                    <h5>50% off</h5>
                </div>
                </div>
                <div className="cardFooter">
                    <button className="btn outline" onClick={() => dispatch({type: "ADD_TO_WISHLIST", payload: id})}>{isWishlist ? <FcLike/> : <FcLikePlaceholder/>}</button>
                    <button className="btn" onClick={() => dispatch({type: "ADD_TO_CART", payload: product})}>Add to Cart</button>
                </div>   
            </div>
    )
}

export default ProductItem
