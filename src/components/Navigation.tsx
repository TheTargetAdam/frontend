import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./Navigation.css"
export function Navigation(){
    const user=JSON.parse(localStorage.getItem("user") || "{}");
    return(
        <nav className='nav-wrapper'>
            <h3 className='font-bold'>rewriter</h3>
            <ul>
                <NavLink to="/" className="nav-link ">Home</NavLink>
                {(user.name && user.token) && <NavLink to="/myorders" className="nav-link">My orders</NavLink>}
                <NavLink to="/allorders" className="nav-link">All Orders</NavLink>
            </ul>
        </nav>
    )
}