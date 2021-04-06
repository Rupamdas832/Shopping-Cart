import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = ({url, body}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [response, setResponse] = useState(null)

    useEffect(() => {
        async function fetchData(){
            setIsLoading(true)
            try {
                const response = await axios(url, body)
                setResponse(response)
            } catch (error) {
                setErrorMsg(error)
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchData();
    },[url])
    return (isLoading, errorMsg, response)
}

export default useAxios;