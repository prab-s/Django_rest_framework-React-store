import { useContext } from 'react';
import { Route, Routes, redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({children, ...rest}:any) => {

    let {user} = useContext(AuthContext)

    console.log('1) Children: ', children)
    console.log('2) Rest: ', rest)
    console.log('3) ...Rest: ', {...rest})
    console.log('4) Children: ', {children})

    return(
        <Routes>
            <Route {...rest}>
                {!user ? window.location.pathname = "/login" : children}
            </Route>
        </Routes>
    )
}

export default PrivateRoute;