import React from 'react'
import { useStore } from '../Store/context'
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductItem = ({product}) => {
    const {id, name, price, img, isWishlist, discount, inStock, inCart, isPrimeChoice, rating} = product
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

    return (
        <div className="ecommerceCard">
                {!inStock && <div className="outOfStockCard">
                    <h2>Out of Stock</h2>
                </div>}
               {isPrimeChoice && <div className="cardBadge">
                    <h5>Prime</h5>
                </div>}
                <div className="cardImg">
                    <img src={img} alt="product"/>
                </div>
                <div className="cardBody">
                    <div className="cardTitle">
                        <p>{name}</p>
                        <span><FaStar/>{rating}</span>    
                    </div>    
                <div className="cardPrice">
                    <h4>₹ {price}</h4>
                    <h5>{discount}% off</h5>
                </div>
                </div>
                <div className="cardFooter">
                    <button className="btn outline" onClick={() => toggleWishlist(id)}>{isWishlist ? <FcLike/> : <FcLikePlaceholder/>}</button>
                    <Link to={`/productDetail/${id}`}><button className="actionBtn">Detail...</button></Link>
                </div>   
            </div>
    )
}

export default ProductItem
