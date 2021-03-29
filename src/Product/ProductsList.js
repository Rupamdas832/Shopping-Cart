import React, { useEffect } from 'react'
import { useCart } from '../Cart/CartContext'
import ProductItem from './ProductItem'
import "./ProductList.css"

const ProductsList = () => {
    const {state} = useCart()
    useEffect(() => {
        console.log("State changed")
    },[state.products])
    return (
        <div className="productList">
            {state.products.map((product) => {
                return <ProductItem product={product} key={product.id}/>
            })}
        </div>
    )
}

export default ProductsList
