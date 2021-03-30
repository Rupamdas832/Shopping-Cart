import React from 'react'
import CartList from '../Cart/CartList'
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
                return <CartList/>
            case "wishlist":
                return <WishList/>
            default: return <Home/>
        }
}
export default HeroSection
