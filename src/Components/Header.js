import React from 'react'
import "./Header.css"
import {FaShoppingBag, FaHeart} from "react-icons/fa"

import { Link, NavLink } from 'react-router-dom'
import { useAuth, useStore, useUser } from '../Store'

export const Header = () => {

    const {storeState} = useStore()
    const {cart} = storeState
    
    const {authState,authDispatch} = useAuth()
    const {isUserLogin} = authState;

    const {userState} = useUser()
    const {user} = userState

    const getAllCartItems = (array) => {
        return array.reduce((total, {quantity}) => total + quantity,0)
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
            </>) 
            : (
                <Link to="/login"><button className="navBtn">Login</button></Link>
                )}
        
        
	</div>
</div>
    )
}
