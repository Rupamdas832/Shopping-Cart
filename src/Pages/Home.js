import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
import { useStore } from '../Store'

export const Home = () => {
    const {storeState} = useStore()
    const {isLoading, products} = storeState
    
    const slicedProducts = products.slice(0,5)
    return (
        <div className="home">
        {isLoading === "loading" ? <div className="spinner"></div> : 
        (<div className="homeContainer">
            <div className="homePicDiv"></div>
            <div className="homeHeading">
                <h1>GRAD GAMES</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </div>
            <h2 className="homeSubHeading">Categories</h2>
            <div className="homeCategoryDiv">
                
                <Link to="/products" className="homeCategory">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROhIH-hKw_oc4B_-HNOXvhKdxyfFGPftOxFg&usqp=CAU" className="avatar lg" alt="category"/>
                    <p>AAA</p>
                </Link>
                <Link to="/products" className="homeCategory">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB5JxRAzOHEP2_gPQZy5Cpx9vCKNV9I9Bg7Q&usqp=CAU" className="avatar lg" alt="category"/>
                    <p>Sports</p>
                </Link>
                <Link to="/products" className="homeCategory">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCYjUaMM8PV27NC6iAIH6R1vQGV18wzlufkg&usqp=CAU" className="avatar lg" alt="category"/>
                    <p>RPG</p>
                </Link>
                <Link to="/products" className="homeCategory">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNDL-MrKhLgrTwNLD9TQh21mZAp_N2dgFbg&usqp=CAU" className="avatar lg" alt="category"/>
                    <p>Action</p>
                </Link>
            </div>
            <h2 className="homeSubHeading">Products</h2>
            
            <div className="homeProductsList">
                {slicedProducts.map(product => {
                    const {_id, name, price, img, discount} = product;
                    return <div className="ecommerceCard1" key={_id}>
                            <div className="cardImg1">
                                <img src={img} alt="product"/>
                            </div>
                            <div className="cardBody">
                                <p>{name}</p>
                                <div className="cardPrice">
                                    <h4>??? {price}</h4>
                                    <h5>{discount}% off</h5>
                                </div>
                            </div>
                            <div className="cardFooter">
                                <Link to={`/productDetail/${_id}`}><button className="btn">Detail...</button></Link>
                            </div>   
                        </div>
                })}
                <Link to="/products" style={{textAlign: "center"}}><p>More...</p></Link>
            </div>
        </div>)}
        </div> 
    )
}
