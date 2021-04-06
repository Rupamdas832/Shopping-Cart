import React from 'react'
import "./Toast.css"

const Toast = ({mesg}) => {
    return (
        <div className="toast">
            <p>{mesg}...</p>
        </div>
    )
}

export default Toast
