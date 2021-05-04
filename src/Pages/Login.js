import axios from 'axios'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Toast } from '../Components'
import { useAuth, useStore, useUser } from '../Store'
import "./Login.css"

export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const {state} = useLocation()
    const navigate = useNavigate()
    
    const { authDispatch } = useAuth()

    const {storeState, storeDispatch} = useStore()
    const {isLoading} = storeState

    const {userDispatch} = useUser()

    const fetchCart = async (cartId) => {
        try{
          const response = await axios.get(`https://Shopping-cart-server-github.rupamdas.repl.co/cart/${cartId}`)
          if(response.status === 200){
            storeDispatch({type: "LOAD_CART_ITEMS", payload: response.data.products})
          }
        } catch(error){
          console.log(error.response.data)
        }
      }
    
      const fetchWishlist = async (wishlistId) => {
        try{
          const response = await axios.get(`https://Shopping-cart-server-github.rupamdas.repl.co/wishlist/${wishlistId}`)
          if(response.status === 200){
            storeDispatch({type: "LOAD_WISHLIST_ITEMS", payload: response.data.products})
          }
        } catch(error){
          console.log(error.response.data)
        }
      }

    const loginWithCredentials = async () => {
        storeDispatch({type: "IS_LOADING", payload: "loggingIn"})
    try {
        const response = await axios.post("https://Shopping-cart-server-github.rupamdas.repl.co/login",{
                "email": email,
                "password": password
        })
        const user = response.data.user
        if(response.status === 200){
            authDispatch({type: "USER_LOGIN"})
            userDispatch({type: "LOAD_USER", payload: user})
            localStorage.setItem("CartLoginUser", JSON.stringify({
                isUserLogin: true,
                userId: user._id
            }))
            fetchCart(user.cartId)
            fetchWishlist(user.wishlistId)
            navigate(state?.from ? state.from : "/")
        }
    } catch (error) {
        setError(error.response.data.message)
    }
    finally{
        storeDispatch({type: "IS_LOADING", payload: "success"})
    }
}
    return (
        <div className="login">
            {isLoading === "loggingIn" ? <Toast message="Authenticating Details..."/> : null}
            <div className="formCard">
                <h1>Login</h1>
                <div className="formInput">
                    <label>Email</label>
                    <input placeholder="Type your email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="formInput">
                    <label>Password</label>
                    <input placeholder="Type your password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {error && <p className="errorMessage">{error}</p>}
                <button className="formBtn" onClick={loginWithCredentials}>LogIn</button>
                <div className="redirectToSignup">
                    <p>new to GradGrams! <Link to="/signup"> Signup here</Link></p>
                </div>
            </div>
        </div>
    )
}
