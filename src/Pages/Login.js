import React from 'react'
import "./Login.css"

export const Login = () => {
    return (
        <div className="login">
            <div className="formCard">
                <h1>Login</h1>
                <div className="formInput">
                    <label>Email</label>
                    <input placeholder="Type your email" type="email"/>
                </div>
                <div className="formInput">
                    <label>Password</label>
                    <input placeholder="Type your password" type="password"/>
                </div>
                <button className="formBtn">LogIn</button>
            </div>
        </div>
    )
}
