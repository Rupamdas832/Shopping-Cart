import React, { useEffect } from 'react'
import { useStore } from '../Store/context'
import ProductItem from './ProductItem'
import "./ProductList.css"

const ProductsList = () => {
    const {state} = useStore()
    useEffect(() => {
        console.log("State changed")
    },[state.products])
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
            {state.products.map((product) => {
                return <ProductItem product={product} key={product.id}/>
            })}
            </div>
            
        </div>
    )
}

export default ProductsList
