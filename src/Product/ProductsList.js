import React, { useReducer } from 'react'
import { useStore } from '../Store/context'
import ProductItem from './ProductItem'
import "./ProductList.css"

const ProductsList = () => {
    const {state} = useStore()
  
    const initialState = {
        sortBy: null,
        showPrimeChoice: false,
        showInventoryAll: false,
        category: null
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case "SORT": 
                return {...state, sortBy: action.payload}
            case "TOGGLE_INVENTORY":
                return {...state, showInventoryAll: !state.showInventoryAll}
            case "TOGGLE_PRIME_CHOICE":
                return {...state, showPrimeChoice: !state.showPrimeChoice}
            case "CATEGORY":
                return {...state, category: action.payload}
            case "RESET":
                return {...state, 
                    sortBy: null,
                    showPrimeChoice: false,
                    showInventoryAll: false,
                    category: null}
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

    const getCategory = (productList, category) => {
        if(category && category === "MEN"){
            return productList.filter((product) => product.category === "MEN")
        }
        if(category && category === "WOMEN"){
            return productList.filter((product) => product.category === "WOMEN")
        }
        if(category && category === "GIRL"){
            return productList.filter((product) => product.category === "GIRL")
        }
        if(category && category === "BOY"){
            return productList.filter((product) => product.category === "BOY")
        }
        return productList
    }

    const sortedData = getSortedData(state.products, productState.sortBy)
    const categoryData = getCategory(sortedData, productState.category)
    const filteredData = getFilteredData(categoryData, productState.showPrimeChoice, productState.showInventoryAll)
    

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
                <div className="productFilter">
                    <p>Category</p>
                    <ul>
                    <li><label><input 
                    type="radio" name="category" 
                    onChange={() => productDispatch({type: "CATEGORY", payload: "MEN"})}
                    checked={productState.category && productState.category === "MEN"}
                />
                Men
                </label></li>
                <li><label><input 
                    type="radio" name="category"
                    onChange={() => productDispatch({type: "CATEGORY", payload: "WOMEN"})}
                    checked={productState.category && productState.category === "WOMEN"}
                />
                Women
                </label></li>
                <li><label><input 
                    type="radio" name="category"
                    onChange={() => productDispatch({type: "CATEGORY", payload: "GIRL"})}
                    checked={productState.category && productState.category === "GIRL"}
                />
                Girl
                </label></li>
                <li><label><input 
                    type="radio" name="category"
                    onChange={() => productDispatch({type: "CATEGORY", payload: "BOY"})}
                    checked={productState.category && productState.category === "BOY"}
                />
                Boy
                </label></li>
                    </ul>
                </div>
                <button onClick={() => productDispatch({type: "RESET"})} className="btn outline">RESET</button>
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
