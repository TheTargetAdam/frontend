import React,{useEffect} from "react";
import axios from "axios"
import "./HomePage.css"
// import homepage from "../images/homepage.jpg"
export function HomePage(){

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    return (       
        <div className="home-wrapper">
            This is Home Page
            <img></img>
        </div>
    )
}