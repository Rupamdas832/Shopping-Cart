import React from 'react'
import "./Toast.css"
import { FcApproval } from "react-icons/fc";

export const Toast = ({message}) => {
    return (
        <div className="toast">
            <p><FcApproval/> {message}...</p>
        </div>
    )
}
