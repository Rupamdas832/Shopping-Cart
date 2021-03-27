import React from 'react'

const Header = ({setRoute}) => {
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
        <button class="btn unstyled" onClick={() => setRoute("wishlist")}><i class="fab fa-gratipay"></i></button>
        <button class="btn unstyled" onClick={() => setRoute("cart")}><i class="fas fa-shopping-bag"></i></button>
    </div>
</div>
    )
}

export default Header
