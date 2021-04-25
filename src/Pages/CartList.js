import React from 'react'
import "./CartList.css"
import {CartItem, CartTotal} from "../Cart"
import {Toast} from '../Components';
import { useStore } from '../Store';

export const CartList = () => {
    const {storeState} = useStore()
    const {isLoading, cart} = storeState

    return (
        <div className="cartContainer">
        {isLoading === "removing" ? <Toast message="Removing from Cart"/> : null}
            <h1>Cart</h1>
            {cart.length === 0 ? (<p>Your Shopping bag is empty!</p>) : 
                (
                <div className="cartListContainer">
                    <div className="cartList">
                        {cart.map(cartItem => {
                            return <CartItem cartItem={cartItem} key={cartItem._id}/>
                        })}
                    </div>
                    <div className="cartTotal">
                        <CartTotal/>  
                    </div>
                </div>
                )}  
        </div>
    )
}
