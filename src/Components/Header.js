import React from 'react'
import "./Header.css"
import {FaShoppingBag, FaHeart} from "react-icons/fa"

import { Link, NavLink } from 'react-router-dom'
import { useAuth, useStore, useUser } from '../Store'
import axios from 'axios'

export const Header = () => {

    const {storeState, storeDispatch} = useStore()
    const {cart} = storeState
    
    const {authState,authDispatch} = useAuth()
    const {isUserLogin} = authState;

    const {userState} = useUser()
    const {user} = userState

    const getAllCartItems = (array) => {
        return array.reduce((total, {quantity}) => total + quantity,0)
    }

    const fetchProducts= async() => {
        storeDispatch({type: "IS_LOADING", payload: "loading"})
        try {
            const response = await axios.get("https://Shopping-Cart-Server.rupamdas.repl.co/products")
            const data = response.data.products
            if(response.status === 200){
                storeDispatch({type: "IS_LOADING"})
                storeDispatch({type: "LOAD_PRODUCTS", payload: data})
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            storeDispatch({type: "IS_LOADING", payload: "success"})
        }
    }

    const logoutUser = () => {
        localStorage.removeItem("CartLoginUser")
        authDispatch({type: "USER_LOGOUT"})
        fetchProducts()
    }

    return (
        <div className="navbar">
    <div className="navLogo">
        <img src="https://thumbs.dreamstime.com/b/letter-gg-simple-logo-icon-design-vector-simple-circle-logo-vector-illustration-letter-gg-simple-logo-icon-design-vector-180925896.jpg" alt="logo"/>
    </div>
    <div className="navLinks">
        <NavLink to="/" exact><button className="navBtn">Home</button></NavLink>
        <NavLink to="/products" exact><button className="navBtn">Products</button></NavLink>
    </div>
    <div className="navAction">
        {isUserLogin && user ? (<>
                                    <div className="tooltip">
                                        <Link to="/wishlist"><button className="navBtn"><FaHeart/></button></Link>
                                        <span className="tooltipText">WishList</span>
                                    </div>
                                    <div className="tooltip">
                                        <Link to="/cart"><button className="navBtn"><FaShoppingBag/></button></Link>
                                        <span className="tooltipText">Shopping Bag</span>
                                        {cart.length === 0 ? null : <span className="badge">{getAllCartItems(cart)}</span>}
                                    </div>
                                    <button className="navBtn" onClick={logoutUser}>Logout</button>
            </>) 
            : (
                <Link to="/login"><button className="navBtn">Login</button></Link>
                )} 
	</div>
</div>
    )
}
