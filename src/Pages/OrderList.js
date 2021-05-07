import React from 'react'
import "./OrderList.css"
import { useStore } from '../Store'
import { OrderItem } from '../Order'

export const OrderList = () => {

    const {storeState} = useStore()
    const {orders} = storeState
    
    return (
        <div className="orderListContainer">
            <h1>ALL orders</h1>
            {orders.length === 0 ? <p>You haven't placed any orders yet!</p> : (
                <div>
                {orders && orders.map((order,idx) => {
                    const {totalPrice,address, cartItems} = order;
                    return <OrderItem key={idx} totalPrice={totalPrice} shippedAddress={address} cartItems={cartItems}/>
                })}
                </div>
            )}
            
        </div>
    )
}
