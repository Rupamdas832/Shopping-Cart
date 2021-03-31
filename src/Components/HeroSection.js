import React, {useEffect} from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import CartList from '../Cart/CartList'
import ProductsList from '../Product/ProductsList'
import WishList from '../WishList/WishList'
import Home from './Home'
import axios from "axios"
import { useStore } from '../Store/context'

const HeroSection = ({route}) => {
    const {dispatch} = useStore()
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
        }
        fetchData();
    },[])
    return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/products" component={ProductsList}/>
                <Route path="/cart" component={CartList}/>
                <Route path="/wishlist" component={WishList}/>
            </Switch>
    )       
}
export default HeroSection
