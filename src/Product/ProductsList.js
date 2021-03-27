import React from 'react'
import Products from '../Assets/Products'
import ProductItem from './ProductItem'
import "./ProductList.css"

const ProductsList = () => {
    return (
        <div className="productList">
            {Products.map((product) => {
                return <ProductItem product={product} key={product.id}/>
            })}
        </div>
    )
}

export default ProductsList
