export const getSortedData = (productList, sortBy) => {
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

export const getFilteredData = (productList, showPrimeChoice, showInventoryAll) => {
        return productList.filter(({ inStock }) => (showInventoryAll ? true : inStock)).filter(({ isPrimeChoice }) => (showPrimeChoice ? isPrimeChoice : true))
    }

export const getCategory = (productList, category) => {
        if(category && category === "AAA"){
            return productList.filter((product) => product.category === "AAA")
        }
        if(category && category === "SPORTS"){
            return productList.filter((product) => product.category === "SPORTS")
        }
        if(category && category === "RPG"){
            return productList.filter((product) => product.category === "RPG")
        }
        if(category && category === "ACTION"){
            return productList.filter((product) => product.category === "ACTION")
        }
        return productList
    }
    

