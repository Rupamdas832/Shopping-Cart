import React, {useEffect} from 'react'
import { useStore } from '../Store/context'
import ProductItem from './ProductItem'
import axios from "axios"
import "./ProductList.css"

const ProductsList = () => {
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
        }
        fetchData();
    },[])
    
    return (
        <div className="productListContainer">
            <div className="productLeftContainer">
                <div className="productSort">
                    <p>Sort by</p>
                    <ul>
                        <li><label><input type="radio" name="sort"/>Low to High</label></li>
                        <li><label><input type="radio" name="sort"/>High to Low</label></li>
                    </ul>
                </div>
                <div className="productFilter">
                    <p>Filter by</p>
                    <ul>
                        <li><label><input type="radio" name="filter"/>Mobile</label></li>
                        <li><label><input type="radio" name="filter"/>Clothes</label></li>
                        <li><label><input type="radio" name="filter"/>Shoes</label></li>
                        <li><label><input type="radio" name="filter"/>Games</label></li>
                    </ul>
                </div>
            </div>
            <div className="productRightContainer">
            {state.isLoading === "loading" ? <div className="spinner"></div> : null}
            {state.products.map((product) => {
                return <ProductItem product={product} key={product.id}/>
            })}
            </div>
            
        </div>
    )
}

export default ProductsList
