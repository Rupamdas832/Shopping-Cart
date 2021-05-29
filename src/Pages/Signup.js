import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./Signup.css"
import {useAuth, useStore, useUser} from "../Store"
import {Toast} from "../Components"
import axios from 'axios'
import {URL} from "../Api/apiURL"

export const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const {state} = useLocation()

    const { authDispatch } = useAuth()
    const {userDispatch} = useUser()

    const {storeState, storeDispatch} = useStore()
    const {isLoading} = storeState

    const fetchWishlist = async (wishlistId) => {
        try{
          const response = await axios.get(`${URL}/wishlist/${wishlistId}`)
          if(response.status === 200){
            storeDispatch({type: "LOAD_WISHLIST_ITEMS", payload: response.data.products})
          }
        } catch(error){
          console.log(error.response.data)
        }
      }

    const fetchCart = async (cartId) => {
        try{
          const response = await axios.get(`${URL}/cart/${cartId}`)
          if(response.status === 200){
            storeDispatch({type: "LOAD_CART_ITEMS", payload: response.data.products})
          }
        } catch(error){
          console.log(error.response.data)
        }
      }

    const signUpUser = async () => {
        storeDispatch({type: "IS_LOADING", payload: "signup"})
        try {
            const response = await axios.post(`${URL}/signup` ,{
                    "name": name,
                    "email": email,
                    "password": password
            })
            const user = response.data.user
            console.log(response)
            if(response.status === 201){
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
        <div className="signup">
            {isLoading === "signup" ? <Toast message="Signing up..."/> : null}
            <div className="formCard">
                <h1>Signup</h1>
                <div className="formInput">
                    <label>Name</label>
                    <input placeholder="Type your name" type="text" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="formInput">
                    <label>Email</label>
                    <input placeholder="Type your email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="formInput">
                    <label>Password</label>
                    <input placeholder="Type your password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {error && <p className="errorMessage">{error}</p>}
                <button className="formBtn" onClick={signUpUser}>Signup</button>
                <div className="redirectToSignup">
                    <p>new to GradGrams! <Link to="/login"> Login here</Link></p>
                </div>
            </div>
        </div>
    )
}
