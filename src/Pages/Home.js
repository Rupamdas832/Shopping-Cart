import React from 'react'
import "./Home.css"
import HeroPic from "../Assets/HeroPic.jpg"
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="homeContainer">
            <div className="homePicDiv"></div>
            <div className="homeHeading">
                <h1>GRAD GAMES</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </div>
            <h2>Categories</h2>
            <div className="homeCategoryDiv">
                
                <Link to="/products" className="homeCategory">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROhIH-hKw_oc4B_-HNOXvhKdxyfFGPftOxFg&usqp=CAU" className="avatar lg"/>
                    <p>AAA</p>
                </Link>
                <Link to="/products" className="homeCategory">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB5JxRAzOHEP2_gPQZy5Cpx9vCKNV9I9Bg7Q&usqp=CAU" className="avatar lg"/>
                    <p>Sports</p>
                </Link>
                <Link to="/products" className="homeCategory">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCYjUaMM8PV27NC6iAIH6R1vQGV18wzlufkg&usqp=CAU" className="avatar lg"/>
                    <p>RPG</p>
                </Link>
                <Link to="/products" className="homeCategory">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNDL-MrKhLgrTwNLD9TQh21mZAp_N2dgFbg&usqp=CAU" className="avatar lg"/>
                    <p>Action</p>
                </Link>
            </div>
        </div>
    )
}

export default Home
