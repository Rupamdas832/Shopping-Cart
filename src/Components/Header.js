import React from 'react'
import "./Header.css"
import {FaShoppingBag, FaHeart} from "react-icons/fa"
import { useStore } from '../Store/context'

const Header = ({setRoute}) => {

    const {state} = useStore()
    return (
        <div class="navbar ecommerce">
    <div class="navLogo">
        LOGO
    </div>
    <div class="navSearch ecommerce">
        <label><i class="fab fa-searchengin"></i></label>
        <input placeholder="Quick search anything"/>
    </div>
    <div class="navLinks  ecommerce">
        <button class="navBtn ecommerce" onClick={() => setRoute("home")}>Home</button>
        <button class="navBtn ecommerce" onClick={() => setRoute("products")}>Products</button>
    </div>
    <div class="navAction ecommerce">
        <div className="tooltip">
            <button className="btn unstyled" onClick={() => setRoute("wishlist")}><FaHeart/></button>
            <span className="tooltipText">WishList</span>
        </div>
        <div className="tooltip">
            <button className="btn unstyled" onClick={() => setRoute("cart")}><FaShoppingBag/></button>
            <span className="tooltipText">Shopping Bag</span>
            {state.cart.length === 0 ? null : <span className="badge">{state.cart.length}</span>}
        </div>
    </div>
</div>
    )
}

export default Header
