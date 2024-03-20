
import * as React from "react";
import logo from "../images/menuBarLogo.png";
import {Link, useMatch, useResolvedPath} from "react-router-dom";



export default function NavBar({ isLoggedIn }){

    // Log the value of isLoggedIn whenever the component re-renders
    React.useEffect(() => {
        console.log("isLoggedIn:", isLoggedIn);
    }, [isLoggedIn]); // This effect will re-run whenever isLoggedIn changes

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
                    <CustomLink to="/dashboard">Dashboard</CustomLink>
                    <CustomLink to="/logout">Log Out</CustomLink>
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

function CustomLink ({to, children, ...props }){
    //const path = window.location.pathname

    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path : resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}