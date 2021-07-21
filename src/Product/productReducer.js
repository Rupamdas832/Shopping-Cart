export const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };
    case "TOGGLE_INVENTORY":
      return { ...state, showInventoryAll: !state.showInventoryAll };
    case "TOGGLE_PRIME_CHOICE":
      return { ...state, showPrimeChoice: !state.showPrimeChoice };
    case "ADD_CATEGORY":
      return { ...state, category: [...state.category, action.payload] };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        category: state.category.filter((item) => item !== action.payload),
      };
    case "RESET":
      return {
        ...state,
        sortBy: null,
        showPrimeChoice: false,
        showInventoryAll: false,
        category: [],
      };
    default:
      return state;
  }
};
