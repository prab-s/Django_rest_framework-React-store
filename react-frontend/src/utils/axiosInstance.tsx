import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from 'dayjs'

// This file is no longer in use

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') as string) : null
const baseUrl = 'http://localhost:8000'

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
})

axiosInstance.interceptors.request.use(async req => {
    if(!authTokens){
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') as string) : null
        req.headers.Authorization = `Bearer ${authTokens?.access}`
    }

    const user:any = jwtDecode(authTokens.access)
    const isExpired = dayjs.unix(user['exp']).diff(dayjs()) < 1

    if(!isExpired) return req

    const response = await axios.post(`${baseUrl}/api/token/refresh/`, {refresh: authTokens.refresh})

    localStorage.setItem('authTokens', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${authTokens?.access}`

    return req
})