import React from 'react'
import { useStore } from '../Store/context'
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductItem = ({product}) => {
    const {id, name, price, img, isWishlist, discount, inStock, inCart} = product
    const {dispatch} = useStore()

    const toggleWishlist = () => {
        if(isWishlist){
            dispatch({type: "REMOVE_FROM_WISHLIST", payload: id})
        } else {
            async function fetchData() {
                try {
                    const response = await axios.post("/api/wishlist", product)
                    if(response.status === 201){
                        dispatch({type: "ADD_TO_WISHLIST", payload: id})
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchData();
        }
    }
    const addToCart = (product) => {
        product.inCart = true;
        async function fetchData() {
            try {
                const response = await axios.post("/api/cart", product)
                if(response.status === 201){
                    dispatch({type: "ADD_TO_CART", payload: product})
                }
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchData();  
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
