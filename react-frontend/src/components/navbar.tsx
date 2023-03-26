// import { Container, Nav, Navbar as NavbarBs, Button, NavDropdown, NavItem } from "react-bootstrap";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Fragment, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useShoppingCart } from "../context/shoppingCartContext";

export function Navbar() {

    let { user, logoutUser, updateToken } = useContext(AuthContext)
    const { cartQuantity } = useShoppingCart()

    // Fontawesome icons link: https://fontawesome.com/v4/icons/

    return (
        <Fragment>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark bg-opacity-50">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="#!">Navbar</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse collapse" id="navbarSupportedContent">
                        <div className="navbar-nav me-auto mb-2 mb-lg-0">
                            <div className="nav-item">
                                <CustomLink className="nav-link" to="/"><i className="fa fa-home fa-fw" aria-hidden="true" />Home</CustomLink>
                            </div>
                            <div className="nav-item">
                                <CustomLink className="nav-link" to="/about"><i className="fa fa-book fa-fw" aria-hidden="true" />About</CustomLink>
                            </div>
                            <div className="nav-item">
                                <CustomLink className="nav-link" to="/store"><i className="fa fa-university fa-fw" aria-hidden="true" />Store</CustomLink>
                            </div>
                        </div>

                        <div className="d-flex navbar-nav" >

                            {user ? 
                                <CustomLink to="/cart" style={{ width: "3rem", height: "3rem", position: "relative" }} className="nav-link btn btn-info rounded" >
                                    <img src="src/assets/cart2.svg" width="26" height="26" />
                                    <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                                        style={{
                                            color: "white",
                                            width: "1.5rem",
                                            height: "1.5rem",
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                            transform: "translate(25%, 25%)",
                                        }}>{cartQuantity}</div>
                                </CustomLink>
                            : null}

                            <span className="m-2 text-light"> &#8287; &#8287; </span>

                            {user ?
                                <div className="nav-item dropdown me-5 pe-5">
                                    <div className="nav-link dropdown-toggle shadow" role="button" data-bs-toggle="dropdown" aria-expanded="false">{user.username}</div>
                                    <div className="dropdown-menu">
                                        <div><CustomLink className="nav-link disabled" to="/haha">Profile</CustomLink></div>
                                        {/* <div><a className="nav-link" onClick={updateToken}>Update token</a></div> */}
                                        <hr className="dropdown-divider" />
                                        <div><a className="nav-link" onClick={logoutUser}><i className="fa fa-lock fa-fw" aria-hidden="true" />Logout</a></div>
                                    </div>
                                </div>
                                :
                                <CustomLink className="nav-link" to="/login"><i className="fa fa-key fa-fw" aria-hidden="true" />Login</CustomLink>
                            }

                        </div>
                    </div>
                </div>
            </nav >
            <div id="liveAlertPlaceholder" className="container m-2"></div>
        </Fragment>
    );
}

function CustomLink({ to, children, ...props }: any) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}