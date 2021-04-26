import React from 'react'
import { useParams } from 'react-router'
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import "./ProductDetail.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import {LoginModal, Toast} from '../Components';
import { useAuth, useStore, useUser } from '../Store';

export const ProductDetail = () => {

    const {productId} = useParams()

    const {storeState, storeDispatch} = useStore()
    const {isLoading, products} = storeState;

    const {authState, authDispatch} = useAuth();
    const {isUserLogin, isLoginModalOpen} = authState;

    const {userState} = useUser();
    const {user} = userState

    const  SelectedProduct = products.find(product => product._id === productId)
    const {_id, img, name, price, desc, rating, discount, isWishlist, inCart} = SelectedProduct


    const loginToggler = () => {
        if(isUserLogin){
            return authDispatch({type: "LOGIN_MODAL", payload: false})
        }
        else return authDispatch({type: "LOGIN_MODAL", payload: true})
    }

    const toggleWishlist = async () => {
        if(isWishlist){
            storeDispatch({type: "IS_LOADING", payload: "removing from wishlist"})
            try {
                const response = await axios.delete(`https://Shopping-Cart-Server.rupamdas.repl.co/wishlist/${user.wishlistId}/${_id}`)
                if(response.status === 202){
                    storeDispatch({type: "REMOVE_FROM_WISHLIST", payload: _id})
                } 
            } catch (error) {
                console.log(error.response.data)
            }
            finally{
                storeDispatch({type: "IS_LOADING", payload: "success"})
            }
        } else {
            storeDispatch({type: "IS_LOADING", payload: "wishlisting"})
            try {
                const response = await axios.post(`https://Shopping-Cart-Server.rupamdas.repl.co/wishlist/${user.wishlistId}`, {
                    "productId" : _id
                })
                if(response.status === 201){
                    storeDispatch({type: "ADD_TO_WISHLIST", payload: _id})
                }
            } catch (error) {
                console.log(error)
            }
            finally{
                storeDispatch({type: "IS_LOADING", payload: "success"})
            }
        }
    }
    const addToCart = (product) => {
        product.inCart = true;
        async function fetchData() {
            storeDispatch({type: "IS_LOADING", payload: "adding"})
            try {
                const response = await axios.post(`https://Shopping-Cart-Server.rupamdas.repl.co/cart/${user.cartId}`, {
                    "productId" : _id
                })
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
        <div className="productDetailContainer">
        {isLoginModalOpen && <LoginModal/>}
        {isLoading === "adding" ? <Toast message="Adding to Cart"/> : null}
        {isLoading === "wishlisting" ? <Toast message="Adding to Wishlist"/> : null}
        {isLoading === "removing from wishlist" ? <Toast message="Removing from Wishlist"/> : null}
            <div className="flatCard">
                <div className="imgFlat large">
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
                    {isUserLogin ? (
                        <button className="btn outline" onClick={() => toggleWishlist(_id)}>{isWishlist ? <FcLike/> : <FcLikePlaceholder/>}</button>
                    ) : (
                        <button className="btn outline" onClick={() => loginToggler()}>{isWishlist ? <FcLike/> : <FcLikePlaceholder/>}</button>
                    )}
                    {isUserLogin ? (<div>
                        {inCart ? (<Link to="/cart"><button className="actionBtn">Go to Cart</button></Link>) : (<button className="btn" onClick={() => addToCart(SelectedProduct)}>Add to Cart</button>)}
                    </div>) : (
                        <button className="btn" onClick={() => loginToggler()}>Add to Cart</button>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}
