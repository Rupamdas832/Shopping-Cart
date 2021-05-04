import React, { useEffect, useState } from 'react'

import { Route , Navigate} from "react-router-dom"

export const PrivateRoute = ({path, ...props}) => {

    const loginStatus = JSON.parse(localStorage.getItem("CartLoginUser"))
    
    return (loginStatus.isUserLogin ? (
        <Route {...props}/>
    ) : (
        <Navigate replace state={{from: path}} to="/login"/>
    ))
    
}
