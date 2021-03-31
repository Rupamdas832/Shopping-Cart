import React from 'react'
import { useStore } from '../Store/context'
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { Link } from 'react-router-dom';

const ProductItem = ({product}) => {
    const {id, name, price, img, isWishlist, discount, inStock, inCart} = product
    const {dispatch} = useStore()

    const toggleWishlist = () => {
        {isWishlist ? (dispatch({type: "REMOVE_FROM_WISHLIST", payload: id})) : (dispatch({type: "ADD_TO_WISHLIST", payload: id}))}  
    }
    const addToCart = (product) => {
        product.inCart = true;
        dispatch({type: "ADD_TO_CART", payload: product})
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
                    {inCart ? (<Link to="/cart"><button className="actionBtn">Go to Cart</button></Link>) : (<button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>)}
                </div>   
            </div>
    )
}

export default ProductItem
