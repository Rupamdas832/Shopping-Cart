import React from 'react'
import "./Header.css"
import {FaShoppingBag, FaHeart} from "react-icons/fa"
import { useStore } from '../Store/context'

const Header = ({setRoute}) => {

    const {state} = useStore()
    return (
        <div className="navbar">
    <div className="navLogo">
        LOGO
    </div>
    <div className="navLinks">
        <button className="navBtn" onClick={() => setRoute("home")}>Home</button>
        <button className="navBtn" onClick={() => setRoute("products")}>Products</button>
    </div>
    <div className="navAction">
        <div className="tooltip">
            <button className="navBtn" onClick={() => setRoute("wishlist")}><FaHeart/></button>
                <span className="tooltipText">WishList</span>
        </div>
        <div className="tooltip">
            <button className="navBtn" onClick={() => setRoute("cart")}><FaShoppingBag/></button>
                <span className="tooltipText">Shopping Bag</span>
                {state.cart.length === 0 ? null : <span className="badge">{state.cart.length}</span>}
        </div>
	</div>
</div>
    )
}

export default Header
