import React, {useEffect} from 'react'
import {Routes, Route} from "react-router-dom"
import WishList from '../WishList/WishList'
import {Home, CartList, ProductDetail, ProductsList, Login, Signup} from '../Pages'
import axios from "axios"
import { useStore } from '../Store'
import {PrivateRoute} from "./PrivateRoute/PrivateRoute"

export const HeroSection = () => {
    const {storeDispatch} = useStore()
    useEffect(() => {
        async function fetchData() {
            storeDispatch({type: "IS_LOADING", payload: "loading"})
            try {
                const response = await axios.get("https://Shopping-Cart-Server.rupamdas.repl.co/products")
                console.log(response)
                const data = response.data.products
                if(response.status === 200){
                    storeDispatch({type: "IS_LOADING"})
                    storeDispatch({type: "LOAD_PRODUCTS", payload: data})
                }
            } catch (error) {
                console.log(error)
            }
            finally{
                storeDispatch({type: "IS_LOADING", payload: "success"})
            }
        }
    fetchData();
    },[])
    useEffect(() => {
        async function fetchData() {
            storeDispatch({type: "IS_LOADING", payload: "loading"})
            try {
                const response = await axios.get("/api/cart")
                const data = response.data.carts
                if(response.status){
                    storeDispatch({type: "LOAD_CART_ITEMS", payload: data})
                }
            } catch (error) {
                console.log(error)
            }
            finally{
                storeDispatch({type: "IS_LOADING", payload: "success"})
            }
        }
        fetchData();
    },[])
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
