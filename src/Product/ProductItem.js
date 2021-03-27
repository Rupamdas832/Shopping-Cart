import React from 'react'

const ProductItem = ({product}) => {
    const {name,price} = product
    return (
        <div className="ecommerceCard">
                <div className="cardBody">
                    <p>{name}</p>
                <div className="cardPrice">
                    <h4>{price}</h4>
                    <h5>50% off</h5>
                </div>
                </div>
                <div className="cardFooter">
                    <button className="btn outline"><i class="far fa-heart"></i></button>
                    <button className="btn">Add to Cart</button>
                </div>   
            </div>
    )
}

export default ProductItem
