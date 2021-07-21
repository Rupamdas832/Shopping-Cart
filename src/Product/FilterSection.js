import React from "react";
import { useProduct } from "./productContext";

export const FilterSection = () => {
  const { productState, productDispatch } = useProduct();
  const { sortBy, category, showInventoryAll, showPrimeChoice } = productState;

  const updateCategory = (element, selectedCategory) => {
    if (element.checked) {
      productDispatch({ type: "ADD_CATEGORY", payload: selectedCategory });
    } else {
      productDispatch({ type: "REMOVE_CATEGORY", payload: selectedCategory });
    }
  };
  return (
    <div className="filterContainer">
      <div className="productSort">
        <p>Sort by</p>
        <ul>
          <li>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  productDispatch({
                    type: "SORT",
                    payload: "PRICE_LOW_TO_HIGH",
                  })
                }
                checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
              />
              Price Low to High
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  productDispatch({
                    type: "SORT",
                    payload: "PRICE_HIGH_TO_LOW",
                  })
                }
                checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
              />
              Price High to Low
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  productDispatch({
                    type: "SORT",
                    payload: "RATING_HIGH_TO_LOW",
                  })
                }
                checked={sortBy && sortBy === "RATING_HIGH_TO_LOW"}
              />
              Rating
            </label>
          </li>
        </ul>
      </div>
      <div className="productFilter">
        <p>Filter by</p>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                onChange={() => productDispatch({ type: "TOGGLE_INVENTORY" })}
                checked={showInventoryAll}
              />
              Include out of stock
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                onChange={() =>
                  productDispatch({ type: "TOGGLE_PRIME_CHOICE" })
                }
                checked={showPrimeChoice}
              />
              Prime Choice
            </label>
          </li>
        </ul>
      </div>
      <div className="productFilter">
        <p>Category</p>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                value="AAA"
                name="category"
                onChange={(e) => updateCategory(e.target, e.target.value)}
                checked={category.length > 0 && category.includes("AAA")}
              />
              AAA
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="Sports"
                name="category"
                onChange={(e) => updateCategory(e.target, e.target.value)}
                checked={category.length > 0 && category.includes("Sports")}
              />
              Sports
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="RPG"
                name="category"
                onChange={(e) => updateCategory(e.target, e.target.value)}
                checked={category.length > 0 && category.includes("RPG")}
              />
              RPG
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="Combat"
                name="category"
                onChange={(e) => updateCategory(e.target, e.target.value)}
                checked={category.length > 0 && category.includes("Combat")}
              />
              Combat
            </label>
          </li>
        </ul>
      </div>
      <button
        onClick={() => productDispatch({ type: "RESET" })}
        className="btn outline"
      >
        RESET
      </button>
    </div>
  );
};
