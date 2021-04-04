import React from 'react'
import { useParams } from 'react-router'
import { useStore } from '../Store/context'
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import "./ProductDetail.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductDetail = () => {

    const {productId} = useParams()
    const {state, dispatch} = useStore()

    

    const  SelectedProduct = state.products.find(product => product.id === productId)
    const {id, img, name, price, desc, rating, discount, isWishlist, inCart} = SelectedProduct
    const toggleWishlist = () => {
        if(isWishlist){
            dispatch({type: "REMOVE_FROM_WISHLIST", payload: id})
        } else {
            async function fetchData() {
                try {
                    const response = await axios.post("/api/wishlist", SelectedProduct)
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
        <div className="productDetailContainer">
            <div className="flatCard">
                <div className="imgFlat">
                    <img src={img} alt="card"/>
                </div>
                <div className="detailFlat">
                    <div className="cardTitle">
                        <h2>{name}</h2>
                        <span><FaStar/>{rating}</span>    
                    </div>
                    <div className="priceFlat">
                        <h4>₹{price}</h4>
                        <h5>{discount}% off</h5>
                    </div>
                    <p>{desc}</p>
                    <div className="btnsFlat">
                    <button className="btn outline" onClick={() => toggleWishlist(id)}>{isWishlist ? <FcLike/> : <FcLikePlaceholder/>}</button>
                    {inCart ? (<Link to="/cart"><button className="actionBtn">Go to Cart</button></Link>) : (<button className="btn" onClick={() => addToCart(SelectedProduct)}>Add to Cart</button>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
