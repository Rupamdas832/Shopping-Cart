import React from 'react'
import ProductItem from '../Product/ProductItem'
import FilterSection from "../Product/FilterSection"
import { useStore } from '../Store/context'
import { useProduct } from '../Product/productContext'  
import {getSortedData, getCategory, getFilteredData} from "../Product/ProductFilter"
import "./ProductList.css"

const ProductsList = () => {
    
    const {state} = useStore();
    const {productState} = useProduct();

    const sortedData = getSortedData(state.products, productState.sortBy)
    const categoryData = getCategory(sortedData, productState.category)
    const filteredData = getFilteredData(categoryData, productState.showPrimeChoice, productState.showInventoryAll)

    return (
        <div className="productListContainer">
            <div className="productLeftContainer">
                <FilterSection/>
            </div>
            <div className="productRightContainer">
            {filteredData.map((product) => {
                return <ProductItem product={product} key={product.id}/>
            })}
            </div>
            
        </div>
    )
}

export default ProductsList
