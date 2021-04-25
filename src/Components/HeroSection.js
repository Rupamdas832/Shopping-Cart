import React, {useEffect} from 'react'
import {Routes, Route} from "react-router-dom"
import WishList from '../WishList/WishList'
import {Home, CartList, ProductDetail, ProductsList, Login, Signup} from '../Pages'
import axios from "axios"
import { useStore } from '../Store'
import {PrivateRoute} from "./PrivateRoute/PrivateRoute"

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
            </Routes>
    )       
}
