import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useActions from '../hooks/useActions';
import "./Cabinet.css"
export interface ICabinetProps {
    name: string,
    token: string,
}
export function Cabinet(props: ICabinetProps) {
    const { logout } = useActions();
    const navigate = useNavigate();
    const logoutHandler = () => {
        navigate('/')
        logout()
    }
    return (
        <div className='cabinet-wrapper'>
            <div className='cabinet-container'>
                <div className='info'>
                    Hello
                    {" " + props.name}
                    <button onClick={logoutHandler}>Logout</button>
                </div>

            </div>

        </div>
    )
}