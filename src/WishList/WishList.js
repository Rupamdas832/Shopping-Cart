import React from 'react'
import "./WishList.css"
import { useStore } from '../Store/context'
import Toast from '../Components/Toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

const WishList = () => {

    const {state, dispatch} = useStore()

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
        <div className="wishlistContainer">
            {state.isLoading === "adding" ? <Toast mesg="Adding to Cart"/> : null}
            <h1>WishList</h1>
            <div className="wishList">
                {state.products.map(product => {
                    const {id, name, price, isWishlist, img, inCart} = product;
                    return <div key={id}>
                    {isWishlist && <div className="ecommerceCard" key={id}>
                    <div className="cardImg">
                        <img src={img} alt="product"/>
                    </div>
                    <div className="cardBody">
                        <p>{name}</p>
                    <div className="cardPrice">
                        <h4>₹ {price}</h4>
                    </div>
                    </div>
                    <div className="cardFooter">
                        <button className="btn outline" onClick={() => dispatch({type: "REMOVE_FROM_WISHLIST", payload: id})}>Remove</button>
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
