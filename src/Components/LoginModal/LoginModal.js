import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../Store'
import "./LoginModal.css"

export const LoginModal = () => {

    const {authDispatch} = useAuth()
    return (
        <div className="modal">
           
            <div className="modalBox">
                <h3>To checkout you have to be <span style={{color: "green"}}>Logged In</span></h3>
                <p>Do you want to login?</p>
                <div className="isLoginBtns">  
                    <button className="btn outline" onClick={() => authDispatch({type: "LOGIN_MODAL", payload: false})}>Cancel</button>
                    <Link to="/login" onClick={() => authDispatch({type: "LOGIN_MODAL", payload: false})} ><button className="btn">Login</button></Link>
                </div>
            </div>
        </div>
    )
}
