import axios from "axios";
import jwt_decode, { JwtHeader } from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Source: https://www.youtube.com/watch?v=16-1mTdGBoM

//
//  Only bother using Axios for anything that requirest user authentication, not as a substitute for regular fetch requests
//  e.g.:
//  1) getting and updating the authentication tokens
//  2) getting the 'notes' that appear on the 'Home' page
//  3) getting the user's cart items
//

const baseURL = 'http://192.168.1.81:8000'

const useAxios = () => {
    const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${authTokens?.access}` }
    })

    axiosInstance.interceptors.request.use(async req => {

        const user:any = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    
        if(! isExpired) return req
    
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {refresh: authTokens.refresh})
    
        localStorage.setItem('authTokens', JSON.stringify(response.data))

        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))

        // req.headers.Authorization = `Bearer ${authTokens?.access}`
        req.headers.Authorization = `Bearer ${response.data.access}`
    
        return req
    })

    return axiosInstance
}

export default useAxios;