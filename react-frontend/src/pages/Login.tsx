import { Fragment, useContext } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {

    let {loginUser}:any = useContext(AuthContext)

    return (
        <Fragment>
            <h1>Login</h1>
            
            <form className="mt-5" onSubmit={loginUser}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    {/* <input type="email" name="username" className="form-control text-bg-dark" aria-describedby="emailHelp" /> */}
                    <input type="text" name="username" className="form-control text-bg-dark" aria-describedby="emailHelp" />
                    <span id="emailHelp" className="form-text text-light text-bg-dark bg-opacity-25">We'll never share your email with anyone else.</span>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control text-bg-dark" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input text-bg-dark" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <hr/>
            {/* <div>
                <form onSubmit={loginUser} className="mt-5">
                    <input type='text' name='username' placeholder="Username" /><p/>
                    <input type='password' name='password' placeholder="Password" /><p/>
                    <input type='submit'/>
                </form>
            </div> */}
        </Fragment>
    );
}

export default Login;