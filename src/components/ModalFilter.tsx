


import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./Navigation.css"
export function ModalFilter(){
    return(
        <nav className='nav-wrapper'>
            <h3 className='font-bold'>wtf</h3>
            <span>
                <NavLink to="/" className="nav-link ">Home</NavLink>
                <NavLink to="/myorders" className="nav-link">My orders</NavLink>
                <NavLink to="/allorders" className="nav-link">All Orders</NavLink>
            </span>
        </nav>
    )
}