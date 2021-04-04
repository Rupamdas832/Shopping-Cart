const ProductReducer = (state, action) => {
    switch (action.type) {
        case "PRICE_HIGH_TO_LOW":
            return state.sortedData.sort((a,b) => a["price"]-b["price"])
        case "PRICE_LOW_TO_HIGH":
            return state.sortedData.sort((a,b) => b["price"]-a["price"])
        default:
            return state
    }
}

export default ProductReducer