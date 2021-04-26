import axios from "axios";
import { useState } from "react";


const useAxios = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [response, setResponse] = useState(null)

    const apiCall = async ({type, url, body}) => {
            setIsLoading(true)
            try {
                const response = await axios[type](url, body)
                setResponse(response)
            } catch (error) {
                setErrorMessage(error)
            }
            finally{
                setIsLoading(false)
            }
        };
        
    return {isLoading, errorMessage, response, apiCall}
}

export default useAxios;