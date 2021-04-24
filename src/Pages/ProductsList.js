import React from 'react'
import { useStore } from '../Store/storeContext'
import { useProduct, ProductItem, FilterSection } from '../Product'  
import {getSortedData, getCategory, getFilteredData} from "../Product/ProductFilter"
import "./ProductList.css"
import {Toast} from '../Components'

export const ProductsList = () => {
    
    const {state} = useStore();
    const {productState} = useProduct();

    const sortedData = getSortedData(state.products, productState.sortBy)
    const categoryData = getCategory(sortedData, productState.category)
    const filteredData = getFilteredData(categoryData, productState.showPrimeChoice, productState.showInventoryAll)

    return (
        <div className="productListContainer">
        {state.isLoading === "adding" ? <Toast message="Adding to Cart"/> : null}
        {state.isLoading === "wishlisting" ? <Toast message="Adding to Wishlist"/> : null}
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
