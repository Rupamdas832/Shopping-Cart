import React, {useEffect} from 'react'
import {Switch, Route} from "react-router-dom"
import WishList from '../WishList/WishList'
import {Home, CartList, ProductDetail, ProductsList} from '../Pages'
import axios from "axios"
import { useStore } from '../Store/storeContext'

export const HeroSection = () => {
    const {dispatch} = useStore()
    useEffect(() => {
        async function fetchData() {
            dispatch({type: "IS_LOADING", payload: "loading"})
            try {
                const response = await axios.get("/api/products")
                const data = response.data.products
                if(response.status === 200){
                    dispatch({type: "IS_LOADING"})
                    dispatch({type: "LOAD_PRODUCTS", payload: data})
                }
            } catch (error) {
                console.log(error)
            }
            finally{
                dispatch({type: "IS_LOADING", payload: "success"})
            }
        }
    fetchData();
    },[])
    useEffect(() => {
        async function fetchData() {
            dispatch({type: "IS_LOADING", payload: "loading"})
            try {
                const response = await axios.get("/api/cart")
                const data = response.data.carts
                if(response.status){
                    dispatch({type: "LOAD_CART_ITEMS", payload: data})
                }
            } catch (error) {
                console.log(error)
            }
            finally{
                dispatch({type: "IS_LOADING", payload: "success"})
            }
        }
        fetchData();
    },[])
    return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/products" component={ProductsList}/>
                <Route path="/productDetail/:productId" component={ProductDetail}/>
                <Route path="/cart" component={CartList}/>
                <Route path="/wishlist" component={WishList}/>
            </Switch>
    )       
}
