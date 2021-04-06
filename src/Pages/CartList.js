import React from 'react'
import { useStore } from '../Store/storeContext'
import "./CartList.css"
import {CartItem, CartTotal} from "../Cart"
import {Toast} from '../Components';

export const CartList = () => {
    const {state} = useStore()

    return (
        <div className="cartContainer">
        {state.isLoading === "removing" ? <Toast message="Removing from Cart"/> : null}
            <h1>Cart</h1>
            {state.cart.length === 0 ? (<p>Your Shopping bag is empty!</p>) : 
                (
                <div className="cartListContainer">
                    <div className="cartList">
                        {state.cart.map(cartItem => {
                            return <CartItem cartItem={cartItem} key={cartItem.id}/>
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
