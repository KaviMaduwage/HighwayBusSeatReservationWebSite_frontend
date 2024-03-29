
import * as React from "react";
import logo from "../images/menuBarLogo.png";
import {Link, useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import Cookies from "js-cookie";



export default function NavBar({ isLoggedIn , userData}){
    const navigate = useNavigate();


    const handleLogout = () => {

        Cookies.remove('auth');


        navigate("/");
    };

    return <nav className="nav">
        <img src={logo}
             alt="My Seat"
             style={{ width: '70px', height: '70px', marginLeft: '10px', padding:'5px'}}/>

        <ul>
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/about">About</CustomLink>
            <CustomLink to="/contact">Contact</CustomLink>

            {isLoggedIn ? (
                <>
                    {userData ? (
                        <CustomLink to="/dashboard">Dashboard</CustomLink>
                    ) : null}



                    <CustomLink onClick={handleLogout}>Log Out</CustomLink>
                </>
            ) : (
                <>
                    <CustomLink to="/signIn">Sign In</CustomLink>
                    <CustomLink to="/signUp">Sign Up</CustomLink>
                </>
            )}

        </ul>

    </nav>
}

function CustomLink ({to,onClick, children, ...props }){

    const handleClick = (event) => {
        if (onClick) {
            onClick(event);
        }
    };

    const resolvedPath = useResolvedPath(to);
    let isActive = useMatch({path : resolvedPath.pathname, end: true})

    // check if the link is for Log Out
    if (!to && window.location.pathname !== '/') {
        isActive = false;
    }
    if (to === '/signOut' && window.location.pathname !== '/') {
        isActive = false;
    }
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} onClick={handleClick} {...props}>
                {children}
            </Link>
        </li>
    )
}