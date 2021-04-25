import React from 'react'
import { useProduct, ProductItem, FilterSection } from '../Product'  
import {getSortedData, getCategory, getFilteredData} from "../Product/ProductFilter"
import "./ProductList.css"
import {Toast} from '../Components'
import { useStore } from '../Store'

export const ProductsList = () => {
    
    const {storeState} = useStore();
    const {isLoading, products} = storeState
    const {productState} = useProduct();

    const sortedData = getSortedData(products, productState.sortBy)
    const categoryData = getCategory(sortedData, productState.category)
    const filteredData = getFilteredData(categoryData, productState.showPrimeChoice, productState.showInventoryAll)

    return (
        <div className="productListContainer">
        {isLoading === "adding" ? <Toast message="Adding to Cart"/> : null}
        {isLoading === "wishlisting" ? <Toast message="Adding to Wishlist"/> : null}
            <div className="productLeftContainer">
                <FilterSection/>
            </div>
            <div className="productRightContainer">
            {filteredData.map((product) => {
                return <ProductItem product={product} key={product._id}/>
            })}
            </div>
            
        </div>
    )
}
