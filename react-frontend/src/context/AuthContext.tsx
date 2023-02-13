import { createContext, useState, useEffect, SetStateAction } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext<any>(null);
export default AuthContext;

export const AuthProvider = ({ children }:any) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') as string) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens') as string) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    let loginUser = async (e: any) => {
        e.preventDefault();

        try {
            let response = await fetch(`http://${window.location.hostname}:8000/api/token/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value }),
            })

            let data = await response.json()

            if (response.status == 200) {
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                navigate("/")
                clearErrMsg()

            } else {
                errMsg('Tried logging in' + '<br/>' + response.status + ' - ' + response.statusText)
            }
        }
        catch (err:any) {
            errMsg('Tried logging in' + '<br/>' + err.message)
        }

    }

    let errMsg = (msg:any) => {
        try{
            const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
            alertPlaceholder!.innerHTML = ''

            const wrapper = document.createElement('div')
            wrapper.innerHTML = [
                `<div class="alert alert-danger alert-dismissible" role="alert">`,
                `   <div>${msg}</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>'
            ].join('')

            alertPlaceholder!.append(wrapper)
        }
        catch(msg:any){
            null
        }
    }

    let clearErrMsg = () => {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        alertPlaceholder!.innerHTML = ''
    }

    let logoutUser = () => {
        clearErrMsg()
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate("/login") //navigate("/login", {state: {user: null}})
    }

    let updateToken = async () => {
        try {
            let response = await fetch(`http://${window.location.hostname}:8000/api/token/refresh/`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({"refresh":authTokens.refresh}),
            })

            let data = await response.json()

            if (response.status == 200) {
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
            } else {
                logoutUser()
                errMsg('Tried updating token' + '<br/>' + response.status + ' - ' + response.statusText)
            }
        }
        catch (err:any) {
            errMsg('Tried updating token' + '<br/>' + err.message)
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        // updateToken: updateToken,
        errMsg:errMsg,
        authTokens:authTokens,
    }

    useEffect(() => {

        if(loading){
            updateToken()
        }

        let intervalTime = 1000 * 60 * 4

        let interval = setInterval(() => {
            authTokens ? updateToken() : null
        }, intervalTime)
         return () => clearInterval(interval)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}

