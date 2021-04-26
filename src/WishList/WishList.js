import React from 'react'
import "./WishList.css"
import {Toast} from '../Components'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useStore, useUser } from '../Store'

const WishList = () => {

    const {storeState, storeDispatch} = useStore()
    const {isLoading, products} = storeState

    const {userState} = useUser()
    const {user} = userState

    const addToCart = (product) => {

        const {_id} = product;

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

    const removeFromWishlist = async (_id) => {
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
    }
    return (
        <div className="wishlistContainer">
            {isLoading === "adding" ? <Toast message="Adding to Cart"/> : null}
            {isLoading === "removing from wishlist" ? <Toast message="Removing from Wishlist"/> : null}
            <h1>WishList</h1>
            <div className="wishList">
                {products.map(product => {
                    const {_id, name, price, isWishlist, img, inCart, inStock} = product;
                    return <div key={_id}>
                    {isWishlist && <div className="ecommerceCard" key={_id}>
                    {!inStock && <div className="outOfStockCard">
                        <h2>Out of Stock</h2>
                    </div>}
                    <div className="cardImage">
                        <img src={img} alt="product"/>
                    </div>
                    <div className="cardBody">
                        <p>{name}</p>
                    <div className="cardPrice">
                        <h4>₹ {price}</h4>
                    </div>
                    </div>
                    <div className="cardFooter">
                        <button className="btn outline wishList" onClick={() => removeFromWishlist(_id)}>Remove</button>
                        {inCart ? (<Link to="/cart"><button className="actionBtn">Go to Cart</button></Link>) : (<button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>)}
                    </div>   
                </div>}
                    </div> 
                })}
            </div>
            
        </div>
    )
}

export default WishList
