const StoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "LOAD_PRODUCTS":
      return {
        ...state,
        products: action.payload.map((product) => ({
          ...product,
          isWishlist: false,
          inCart: false,
        })),
      };
    case "LOAD_CART":
      return {
        ...state,
        cart: action.payload,
        products: state.products.map((product) => {
          let productFound = action.payload.find(
            (item) => product._id === item._id
          );
          if (productFound) {
            product.inCart = true;
          }
          return product;
        }),
      };
    case "LOAD_WISHLIST":
      return {
        ...state,
        wishlist: action.payload,
        products: state.products.map((product) => {
          let productFound = action.payload.find(
            (item) => product._id === item._id
          );
          if (productFound) {
            product.isWishlist = true;
          }
          return product;
        }),
      };
    case "LOAD_USER_DATA":
      return {
        ...state,
        address: action.payload.address,
        paymentCards: action.payload.paymentCards,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: state.cart.concat(action.payload),
        products: state.products.map((product) => {
          if (product._id === action.payload._id) {
            product.inCart = true;
          }
          return product;
        }),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
        products: state.products.map((product) => {
          if (product._id === action.payload) {
            product.inCart = false;
          }
          return product;
        }),
      };
    case "INCREASE_COUNT":
      return {
        ...state,
        cart: state.cart.map((cart) => {
          if (cart._id === action.payload) {
            return { ...cart, quantity: cart.quantity + 1 };
          }
          return cart;
        }),
      };
    case "DECREASE_COUNT":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem._id === action.payload) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        }),
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        products: state.products.map((product) => {
          if (product._id === action.payload) {
            return { ...product, isWishlist: true };
          }
          return product;
        }),
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        products: state.products.map((product) => {
          if (product._id === action.payload) {
            return { ...product, isWishlist: false };
          }
          return product;
        }),
        cart: state.cart.map((product) => {
          if (product._id === action.payload) {
            return { ...product, isWishlist: false };
          }
          return product;
        }),
      };
    case "ADD_ADDRESS":
      return { ...state, address: action.payload };
    case "ADD_PAYMENT_CARD":
      return { ...state, paymentCards: action.payload };
    case "REMOVE_ADDRESS":
      return { ...state, address: action.payload };
    case "REMOVE_PAYMENT_CARD":
      return { ...state, paymentCards: action.payload };
    case "ADD_TO_ORDER":
      return {
        ...state,
        orders: state.orders.concat(action.payload.newOrder),
        cart: action.payload.cart,
        products: state.products.map((product) => {
          const cartItem = action.payload.cart.find(
            (item) => item._id === product._id
          );
          if (cartItem) {
            return { ...product, inCart: true };
          } else {
            return { ...product, inCart: false };
          }
        }),
      };
    case "SAVE_FOR_LATER":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};
export default StoreReducer;
