import React from 'react'
import "./Header.css"
import {FaShoppingBag, FaHeart} from "react-icons/fa"
import { useStore } from '../Store/context'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {

    const {state} = useStore()

    const getAllCartItems = (array) => {
        return array.reduce((total, {quantity}) => total + quantity,0)
    }
    return (
        <div className="navbar">
    <div className="navLogo">
        GG
    </div>
    <div className="navLinks">
        <NavLink to="/" activeStyle={{fontWeight: "bold",color: "red"}}><button className="navBtn">Home</button></NavLink>
        <NavLink to="/products" activeStyle={{fontWeight: "bold",color: "red"}}><button className="navBtn">Products</button></NavLink>
    </div>
    <div className="navAction">
        <div className="tooltip">
            <Link to="/wishlist"><button className="navBtn"><FaHeart/></button></Link>
                <span className="tooltipText">WishList</span>
        </div>
        <div className="tooltip">
            <Link to="/cart"><button className="navBtn"><FaShoppingBag/></button></Link>
                <span className="tooltipText">Shopping Bag</span>
                {state.cart.length === 0 ? null : <span className="badge">{getAllCartItems(state.cart)}</span>}
        </div>
	</div>
</div>
    )
}

export default Header
