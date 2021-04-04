import React from 'react'
import "./Header.css"
import {FaShoppingBag, FaHeart} from "react-icons/fa"
import { useStore } from '../Store/context'
import { Link } from 'react-router-dom'

const Header = () => {

    const {state} = useStore()
    return (
        <div className="navbar">
    <div className="navLogo">
        LOGO
    </div>
    <div className="navLinks">
        <Link to="/"><button className="navBtn">Home</button></Link>
        <Link to="/products"><button className="navBtn">Products</button></Link>
    </div>
    <div className="navAction">
        <div className="tooltip">
            <Link to="/wishlist"><button className="navBtn"><FaHeart/></button></Link>
                <span className="tooltipText">WishList</span>
        </div>
        <div className="tooltip">
            <Link to="/cart"><button className="navBtn"><FaShoppingBag/></button></Link>
                <span className="tooltipText">Shopping Bag</span>
                {state.cart.length === 0 ? null : <span className="badge">{state.cart.length}</span>}
        </div>
	</div>
</div>
    )
}

export default Header
