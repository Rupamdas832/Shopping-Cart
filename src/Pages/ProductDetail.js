import React from 'react'
import { useParams } from 'react-router'
import { useStore } from '../Store/storeContext'
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import "./ProductDetail.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Toast} from '../Components';

export const ProductDetail = () => {

    const {productId} = useParams()
    const {state, dispatch} = useStore()

    const  SelectedProduct = state.products.find(product => product.id === productId)
    const {id, img, name, price, desc, rating, discount, isWishlist, inCart} = SelectedProduct

    const toggleWishlist = () => {
        if(isWishlist){
            dispatch({type: "REMOVE_FROM_WISHLIST", payload: id})
        } else {
            async function fetchData() {
                dispatch({type: "IS_LOADING", payload: "wishlisting"})
                try {
                    const response = await axios.post("/api/wishlist", SelectedProduct)
                    if(response.status === 201){
                        dispatch({type: "ADD_TO_WISHLIST", payload: id})
                    }
                } catch (error) {
                    console.log(error)
                }
                finally{
                    dispatch({type: "IS_LOADING", payload: "success"})
                }
            }
            fetchData();
        }
    }
    const addToCart = (product) => {
        product.inCart = true;
        async function fetchData() {
            dispatch({type: "IS_LOADING", payload: "adding"})
            try {
                const response = await axios.post("/api/cart", product)
                if(response.status === 201){
                    dispatch({type: "ADD_TO_CART", payload: product})
                }
            } catch (error) {
                console.log(error)
            }
            finally{
                dispatch({type: "IS_LOADING", payload: "success"})
            }
            
        }
        fetchData();  
    }
    
    return (
        <div className="productDetailContainer">
        {state.isLoading === "adding" ? <Toast message="Adding to Cart"/> : null}
        {state.isLoading === "wishlisting" ? <Toast message="Adding to Wishlist"/> : null}
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
