import React from 'react'
import Cart from '../Cart/Cart'
import ProductsList from '../Product/ProductsList'
import WishList from '../WishList/WishList'
import Home from './Home'

const HeroSection = ({route}) => {
            switch (route) {
                case "home":
                    return <Home/>
                case "products":
                    return <ProductsList/>
                case "cart":
                    return <Cart/>
                case "wishlist":
                    return <WishList/>
            }
            <ProductsList/>
}

export default HeroSection
