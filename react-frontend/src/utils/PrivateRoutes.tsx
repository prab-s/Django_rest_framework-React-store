import { useContext } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Source: https://www.youtube.com/watch?v=2k8NleFjG7I

export const PrivateRoutes = () => {

    let { authTokens } = useContext(AuthContext)

    return(
            authTokens ? <Outlet /> : <Navigate to='/login' />
    )
}