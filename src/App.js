import './App.css';
import {Header,HeroSection, Footer} from "./Components";
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth, useStore, useUser } from './Store';
import axios from 'axios';

function App() {

  const {authDispatch} = useAuth()

  const {userDispatch} = useUser()

  const {storeDispatch} = useStore()

  const fetchCart = async (cartId) => {
    try{
      const response = await axios.get(`https://Shopping-cart-server.rupamdas.repl.co/cart/${cartId}`)
      if(response.status === 200){
        storeDispatch({type: "LOAD_CART_ITEMS", payload: response.data.products})
      }
    } catch(error){
      console.log(error.response.data)
    }
  }
  const fetchWishlist = async (wishlistId) => {
    try{
      const response = await axios.get(`https://Shopping-cart-server.rupamdas.repl.co/wishlist/${wishlistId}`)
      if(response.status === 200){
        storeDispatch({type: "LOAD_WISHLIST_ITEMS", payload: response.data.products})
      }
    } catch(error){
      console.log(error.response.data)
    }
  }

  const fetchUser = async (userId) => {
        try {
            const response = await axios.post("https://Shopping-cart-server.rupamdas.repl.co/user", {
            "userId": userId
            })
            const user = response.data.user
            if(response.status === 200){
              userDispatch({type: "LOAD_USER", payload: user})
              fetchCart(user.cartId)
              fetchWishlist(user.wishlistId)
            }
        } catch (error) {
            console.log(error.response.data)
        }
    
    }

    useEffect(() => {
        const loginStatus = JSON.parse(localStorage.getItem("CartLoginUser"))
        if(loginStatus?.isUserLogin){
            authDispatch({type: "USER_LOGIN"})
            fetchUser(loginStatus.userId)
        }
    },[])

    useEffect(() => {
      async function fetchData() {
          storeDispatch({type: "IS_LOADING", payload: "loading"})
          try {
              const response = await axios.get("https://Shopping-Cart-Server.rupamdas.repl.co/products")
              const data = response.data.products
              if(response.status === 200){
                  storeDispatch({type: "IS_LOADING"})
                  storeDispatch({type: "LOAD_PRODUCTS", payload: data})
              }
          } catch (error) {
              console.log(error)
          }
          finally{
              storeDispatch({type: "IS_LOADING", payload: "success"})
          }
      }
  fetchData();
  },[])


  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <HeroSection/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
