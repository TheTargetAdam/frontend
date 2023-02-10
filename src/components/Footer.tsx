import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./Footer.css"
export function Footer() {
    return (
        <footer className="footer-distributed">

            <div className="footer-right">

                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
                <a href="#"><i className="fa fa-github"></i></a>

            </div>

            <div className="footer-left">

                <p className="footer-links">
                    <a className="link-1" href="#">Home</a>

                    <a href="#">All Orders</a>

                    <a href="#">About</a>

                    
                </p>

                <p>Company Name &copy; 2015</p>
            </div>

        </footer>
    )
}