import React from 'react'
import { useProduct } from './productContext'

const FilterSection = () => {

    const {productState, productDispatch} = useProduct();
    return (
        <div className="filterContainer">
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
        onChange={() => productDispatch({type: "CATEGORY", payload: "AAA"})}
        checked={productState.category && productState.category === "AAA"}
    />
    AAA
    </label></li>
    <li><label><input 
        type="radio" name="category"
        onChange={() => productDispatch({type: "CATEGORY", payload: "SPORTS"})}
        checked={productState.category && productState.category === "SPORTS"}
    />
    Sports
    </label></li>
    <li><label><input 
        type="radio" name="category"
        onChange={() => productDispatch({type: "CATEGORY", payload: "RPG"})}
        checked={productState.category && productState.category === "RPG"}
    />
    RPG
    </label></li>
    <li><label><input 
        type="radio" name="category"
        onChange={() => productDispatch({type: "CATEGORY", payload: "ACTION"})}
        checked={productState.category && productState.category === "ACTION"}
    />
    Action
    </label></li>
        </ul>
    </div>
    <button onClick={() => productDispatch({type: "RESET"})} className="btn outline">RESET</button>
        </div>
    )
}

export default FilterSection
