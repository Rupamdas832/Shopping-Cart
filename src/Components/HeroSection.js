import React from 'react'
import {Routes, Route} from "react-router-dom"
import WishList from '../WishList/WishList'
import {Home, CartList, ProductDetail, ProductsList, Login, Signup, Profile, Checkout, OrderList} from '../Pages'
import {PrivateRoute} from "../Components"


export const HeroSection = () => {
    return (
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/products" element={<ProductsList/>}/>
                <Route path="/productDetail/:productId" element={<ProductDetail/>}/>
                <PrivateRoute path="/cart" element={<CartList/>}/>
                <PrivateRoute path="/wishlist" element={<WishList/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <PrivateRoute path="/profile" element={<Profile/>}/>
                <PrivateRoute path="/checkout" element={<Checkout/>}/>
                <PrivateRoute path="/order" element={<OrderList/>}/>
            </Routes>
    )       
}
