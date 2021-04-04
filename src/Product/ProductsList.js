import React, { useReducer } from 'react'
import { useStore } from '../Store/context'
import ProductItem from './ProductItem'
import "./ProductList.css"

const ProductsList = () => {
    const {state} = useStore()
  
    const initialState = {
        sortBy: null,
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case "SORT": 
                return {...state, sortBy: action.payload}
            default:
                return state
        }
    }

    const [productState, productDispatch] = useReducer(reducer, initialState)

    const getSortedData = (productList, sortBy) => {
        if(sortBy && sortBy === "PRICE_HIGH_TO_LOW"){
            return productList.sort((a,b) => a["price"]-b["price"]) 
        }
        if(sortBy && sortBy === "PRICE_HIGH_TO_LOW"){
            return productList.sort((a,b) => b["price"]-a["price"]) 
        }
        return productList
    }

    const sortedData = getSortedData(state.products, productState.sortBy)


    return (
        <div className="productListContainer">
            <div className="productLeftContainer">
                <div className="productSort">
                    <p>Sort by</p>
                    <ul>
                        <li><label><input 
                            type="radio" name="sort" 
                            onChange={() => productDispatch({type: "SORT", payload: "PRICE_LOW_TO_HIGH"})}
                            checked={productState.sortBy && productState.sortBy === "PRICE_LOW_TO_HIGH"}
                        />
                        Low to High
                        </label></li>
                        <li><label><input 
                            type="radio" name="sort"
                            onChange={() => productDispatch({type: "SORT", payload: "PRICE_HIGH_TO_LOW"})}
                            checked={productState.sortBy && productState.sortBy === "PRICE_HIGH_TO_LOW"}
                        />
                        High to Low
                        </label></li>
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
            {sortedData.map((product) => {
                return <ProductItem product={product} key={product.id}/>
            })}
            </div>
            
        </div>
    )
}

export default ProductsList
