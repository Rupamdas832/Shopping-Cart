import React, { useReducer } from 'react'
import { useStore } from '../Store/context'
import ProductItem from './ProductItem'
import "./ProductList.css"

const ProductsList = () => {
    const {state} = useStore()
  
    const initialState = {
        sortBy: null,
        showPrimeChoice: false,
        showInventoryAll: false
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case "SORT": 
                return {...state, sortBy: action.payload}
            case "TOGGLE_INVENTORY":
                return {...state, showInventoryAll: !state.showInventoryAll}
                case "TOGGLE_PRIME_CHOICE":
                return {...state, showPrimeChoice: !state.showPrimeChoice}
            default:
                return state
        }
    }

    const [productState, productDispatch] = useReducer(reducer, initialState)

    const getSortedData = (productList, sortBy) => {
        if(sortBy && sortBy === "PRICE_LOW_TO_HIGH"){
            return productList.sort((a,b) => parseInt(a["price"])-parseInt(b["price"])) 
        }
        if(sortBy && sortBy === "PRICE_HIGH_TO_LOW"){
            return productList.sort((a,b) => parseInt(b["price"])-parseInt(a["price"])) 
        }
        if(sortBy && sortBy === "RATING_HIGH_TO_LOW"){
            return productList.sort((a,b) => b["rating"]-a["rating"]) 
        }
        return productList
    }

    const getFilteredData = (productList, showPrimeChoice, showInventoryAll) => {
        return productList.filter(({ inStock }) => (showInventoryAll ? true : inStock)).filter(({ isPrimeChoice }) => (showPrimeChoice ? isPrimeChoice : true))
    }

    const sortedData = getSortedData(state.products, productState.sortBy)
    const filteredData = getFilteredData(sortedData, productState.showPrimeChoice, productState.showInventoryAll)
    

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
                        Price Low to High
                        </label></li>
                        <li><label><input 
                            type="radio" name="sort"
                            onChange={() => productDispatch({type: "SORT", payload: "PRICE_HIGH_TO_LOW"})}
                            checked={productState.sortBy && productState.sortBy === "PRICE_HIGH_TO_LOW"}
                        />
                        Price High to Low
                        </label></li>
                        <li><label><input 
                            type="radio" name="sort"
                            onChange={() => productDispatch({type: "SORT", payload: "RATING_HIGH_TO_LOW"})}
                            checked={productState.sortBy && productState.sortBy === "RATING_HIGH_TO_LOW"}
                        />
                        Rating
                        </label></li>
                    </ul>
                </div>
                <div className="productFilter">
                    <p>Filter by</p>
                    <ul>
                        <li><label><input 
                            type="checkbox" 
                            onChange={() => productDispatch({type: "TOGGLE_INVENTORY"})} 
                            checked={productState.showInventoryAll}
                        />
                        Include out of stock
                        </label></li>
                        <li><label><input 
                            type="checkbox" 
                            onChange={() => productDispatch({type: "TOGGLE_PRIME_CHOICE"})} 
                            checked={productState.showPrimeChoice}
                        />
                         Prime Choice
                         </label></li>
                    </ul>
                </div>
            </div>
            <div className="productRightContainer">
            {state.isLoading === "loading" ? <div className="spinner"></div> : null}
            {filteredData.map((product) => {
                return <ProductItem product={product} key={product.id}/>
            })}
            </div>
            
        </div>
    )
}

export default ProductsList
