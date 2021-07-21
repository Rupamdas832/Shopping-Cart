export const getSortedData = (productList, sortBy) => {
  if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
    return productList.sort(
      (a, b) => parseInt(a["price"]) - parseInt(b["price"])
    );
  }
  if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
    return productList.sort(
      (a, b) => parseInt(b["price"]) - parseInt(a["price"])
    );
  }
  if (sortBy && sortBy === "RATING_HIGH_TO_LOW") {
    return productList.sort((a, b) => b["rating"] - a["rating"]);
  }
  return productList;
};

export const getFilteredData = (
  productList,
  showPrimeChoice,
  showInventoryAll
) => {
  return productList
    .filter(({ inStock }) => (showInventoryAll ? true : inStock))
    .filter(({ isPrimeChoice }) => (showPrimeChoice ? isPrimeChoice : true));
};

export const getCategory = (productList, category) => {
  if (category.length === 0) {
    return productList;
  } else {
    let newProductList = [];
    category.map((singleCategory) => {
      let foundProductsWithCategory = productList.filter(
        (product) =>
          product.category.toLowerCase() === singleCategory.toLowerCase()
      );
      if (foundProductsWithCategory) {
        foundProductsWithCategory.map((selectedItem) =>
          newProductList.push(selectedItem)
        );
      }
    });
    return newProductList;
  }
};
