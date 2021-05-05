import React, { useState } from 'react'
import {useLocation} from 'react-router-dom'
import { PrivateRoute, Step1, Step2 } from '../../Components'
import { CartList } from '../CartList'
import "./Checkout.css"

export const Checkout = () => {

    const location = useLocation()
    const price = location.state.from
    
    const [step, setStep] = useState(1)

    const changeStep = (action) => {
        if(action === "Increase"){
            if(step>=2){
                setStep(2)
            }
            else setStep(step + 1)
        }
        else if(action === "Decrease"){
            if(step<=1){
                setStep(1)
            }
            else setStep(step - 1)
        }
    }


    return (!price ? (<PrivateRoute path="/cart" element={<CartList/>}/>) : (
        <div className="checkoutSection">
            <h2>Total Price : ₹{price}</h2>
            <div className="stepsSection">
                <button onClick={() => changeStep("Decrease")} className="btn outline">Back</button>
                <p>{step}</p>
                <button onClick={() => changeStep("Increase")} className="btn outline">Next</button>
            </div>
            <div>
                {step === 1 && <Step1/>}
                {step === 2 && <Step2/>}
            </div>
        </div>
    ))
}
