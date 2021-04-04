import React from 'react'
import { useStore } from '../Store/context'
import CartItem from './CartItem';
import "./CartList.css"
import CartTotal from './CartTotal';

const CartList = () => {
    const {state} = useStore()

    return (
        <div className="cartContainer">
            <h1>Cart</h1>
            <div className="cartListContainer">
                <div className="cartList">
                    {state.cart.length === 0 ? <p>Your Shopping bag is empty!</p> : null}
                    {state.cart.map(cartItem => {
                        return <CartItem cartItem={cartItem} key={cartItem.id}/>
                    })}
                </div>
                <div className="cartTotal">
                    <CartTotal/>  
                </div>
            </div>
            
        </div>
    )
}

export default CartList
