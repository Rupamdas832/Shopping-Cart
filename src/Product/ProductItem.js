import React from 'react'
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth, useStore, useUser } from '../Store';

export const ProductItem = ({product}) => {

    const {_id, name, price, img, isWishlist, discount, inCart, inStock, isPrimeChoice, rating, category} = product
    const {storeDispatch} = useStore()

    const {authState, authDispatch} = useAuth()
    const {isUserLogin} = authState;

    const {userState} = useUser();
    const {user} = userState



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
    const addToCart = async (product) => {
        product.inCart = true;
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

    return (
        <div className="ecommerceCard">
                {!inStock && <div className="outOfStockCard">
                    <h2>Out of Stock</h2>
                </div>}
               {isPrimeChoice && <div className="cardBadge">
                    <h5>Prime</h5>
                </div>}
                <div className="cardLike">
                    {isUserLogin ? (
                        <button className="btn outline" onClick={() => toggleWishlist(_id)}>{isWishlist ? <FcLike/> : <FcLikePlaceholder/>}</button>
                    ) : (
                        <button className="btn outline" onClick={() => loginToggler()}>{isWishlist ? <FcLike/> : <FcLikePlaceholder/>}</button>
                    )}
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
                    {isUserLogin ? (<div>
                            {inCart ? (<Link to="/cart"><button className="actionBtn">Go to Cart</button></Link>) : (<button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>)}
                        </div>) : (
                            <button className="btn" onClick={() => loginToggler()}>Add to Cart</button>
                        )}
                    
                </div>   
            </div>
    )
}
