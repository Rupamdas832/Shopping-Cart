import React, {useEffect} from 'react'
import {Switch, Route} from "react-router-dom"
import CartList from '../Cart/CartList'
import ProductsList from '../Product/ProductsList'
import ProductDetail from './ProductDetail'
import WishList from '../WishList/WishList'
import Home from './Home'
import axios from "axios"
import { useStore } from '../Store/context'

const HeroSection = () => {
    const {state, dispatch} = useStore()
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/products")
                const data = await response.data.products
                if(response.status === 200){
                    dispatch({type: "IS_LOADING"})
                    dispatch({type: "LOAD_PRODUCTS", payload: data})
                }
            } catch (error) {
                console.log(error)
            }
            finally{
                dispatch({type: "IS_LOADING"})
            }
        }
        fetchData();
    },[])
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/cart")
                const data = await response.data.carts
                if(response.status){
                    dispatch({type: "LOAD_CART_ITEMS", payload: data})
                }
            } catch (error) {
                console.log(error, "FROM HERO")
            }
            finally{
                dispatch({type: "IS_LOADING"})
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
export default HeroSection
