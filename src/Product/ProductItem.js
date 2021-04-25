import React, { useEffect } from 'react'
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAxios from '../Hooks/useAxios';
import { useStore } from '../Store';

export const ProductItem = ({product}) => {
    const {_id, name, price, img, isWishlist, discount, inCart, inStock, isPrimeChoice, rating, category} = product
    const {storeDispatch} = useStore()
    const {response, errorMessage, isLoading, apiCall} = useAxios()

    useEffect(() => {
        if(response){
            if(response.status === 201){
                storeDispatch({type: "ADD_TO_WISHLIST", payload: _id})
            }
        }
        if(!isLoading){
            storeDispatch({type: "IS_LOADING", payload: "success"})
        }
    },[response, isLoading])

    const toggleWishlist = () => {
        if(isWishlist){
            storeDispatch({type: "REMOVE_FROM_WISHLIST", payload: _id})
        } else {
            storeDispatch({type: "IS_LOADING", payload: "wishlisting"})
            apiCall({
                type: "post",
                url: "/api/wishlist",
                body: product
            })
        }
    }
    const addToCart = (product) => {
        product.inCart = true;
        async function fetchData() {
            storeDispatch({type: "IS_LOADING", payload: "adding"})
            try {
                const response = await axios.post("/api/cart", product)
                if(response.status === 201){
                    storeDispatch({type: "ADD_TO_CART", payload: product})
                }
            } catch (error) {
                console.log(error)
            }
            finally{
                storeDispatch({type: "IS_LOADING", payload: "success"})
            }
            
        }
        fetchData();  
    }

    return (
        <div className="ecommerceCard">
                {!inStock && <div className="outOfStockCard">
                    <h2>Out of Stock</h2>
                </div>}
               {isPrimeChoice && <div className="cardBadge">
                    <h5>Prime</h5>
                </div>}
                <div className="cardLike">
                    <button className="btn outline" onClick={() => toggleWishlist(_id)}>{isWishlist ? <FcLike/> : <FcLikePlaceholder/>}</button>
                </div>
                <div className="cardImage">
                    <img src={img} alt="product"/>
                </div>
                <div className="cardBody">
                    <div className="cardTitle">
                        <p>{name} ({category})</p>
                        <span><FaStar/>{rating}</span>    
                    </div>    
                <div className="cardPrice">
                    <h4>₹ {price}</h4>
                    <h5>{discount}% off</h5>
                </div>
                </div>
                <div className="cardFooter">  
                    <Link to={`/productDetail/${_id}`}><button className="btn outline">Detail...</button></Link>
                    {inCart ? (<Link to="/cart"><button className="actionBtn">Go to Cart</button></Link>) : (<button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>)}
                </div>   
            </div>
    )
}
