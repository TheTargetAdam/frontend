import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderItem from "../components/OrderItem";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useRegisterUserMutation } from "../store/auth/auth.api";
import useActions from '../hooks/useActions'
import "./Register.css"
export function Register() {
    const initialState = {
        login: "",
        password: "",
        confirmPassword: "",
        email: "",
        status:""
    }
    const initialRadio:string=""
    const [value,setValue]=useState(initialRadio)
    const navigate = useNavigate()
    const [formValue, setFormValue] = useState(initialState)
    const { auth } = useTypedSelector(state => state);
    const { setUser } = useActions();
    const [registerUser,{data,isSuccess,error}]=useRegisterUserMutation()
    const { login, password, confirmPassword, email,status } = formValue
    const handleChange = (e: any) => {
        console.log(formValue)
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }
    const handleRegister = async () => {
        if (login && password && confirmPassword && email) {
            const payload= await registerUser({login,password,email,status}).unwrap()
            if(payload.login && payload.token){
                setUser({id:payload.id,name:payload.login,token:payload.token})
                navigate("/")
            }
        }

    }
    useEffect(() => {
    },[auth.name && auth.token])
return (
    <div className="register-wrapper">
        <h3>Регистрация</h3>
        <div className="register-form">
            <div className="credentials_register">
                <div className="login">
                    <label className="login-label">Login</label>
                    <input type="login"
                        id='login'
                        className='form-control'
                        name="login"
                        value={login}
                        onChange={handleChange} />
                </div>
                <div className="password">
                    <label className="pass-label">Password</label>
                    <input type="password"
                        id='password'
                        className='form-control'
                        name="password"
                        value={password}
                        onChange={handleChange} />
                </div>
                <div className="confirm-password">
                    <label className="confirm-label">Confirm Password</label>
                    <input type="password"
                        id='confirm'
                        className='form-control'
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange} />
                </div>
                <div className="email">
                    <label className="email-label">Email</label>
                    <input type="email"
                        id='email'
                        className='form-controlemail'
                        name="email"
                        value={email}
                        onChange={handleChange} />
                </div>
                <div className="type-user">
                    <div className="creator-button">
                    <label>Creator</label>
                    <input type="radio" value="Creator" name="status" checked={formValue.status=='Creator'?true:false} onChange={handleChange}  ></input>
                    </div>
                    <div className="performer-button">
                    <label>Performer</label>
                    <input type='radio' value="Performer" name="status" checked={formValue.status=='Performer'?true:false} onChange={handleChange}></input>
                    </div>
                    
                </div>
            </div>
            <div className="button-register">
                <button onClick={handleRegister}>Register</button>
            </div>

        </div>
    </div>
)
}