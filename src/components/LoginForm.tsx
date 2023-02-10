import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useActions from '../hooks/useActions'
import { useLoginUserMutation } from '../store/auth/auth.api'
import { NavLink } from 'react-router-dom'
import "./LoginForm.css"
import { useTypedSelector } from "../hooks/useTypedSelector";
export function LoginForm() {
  const initialState = {
    login: "",
    password: "",
  }
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState)
  const { login, password } = formValue
  const [loginUser, { data, isSuccess, isError, error }] = useLoginUserMutation();
  const { setUser } = useActions();
  const { auth } = useTypedSelector(state => state);
  const [isSucess2, setisSucess2] = useState(false);


  const handleLogin = async () => {
    if (login && password) {
      try {
        const payload = await loginUser({ login, password }).unwrap()
        if (payload?.login != null) {
          setUser({ id:payload.id,name: payload.login, token: payload.token })
        }
        else console.log(data?.ErrorMessage)
      }
      catch (e) {

      }
    }
    else {

    }
  }
  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (auth.name) {
      console.log("true")
      navigate("")
    }
  }, [auth.name])
  const handleClick = (e: any) => {
  }
  return (
    <div className='login-wrapper'>
      <div className='login-form'>
        <div className='credentials'>
          <input type="login"
            id='login'
            className='form-control'
            name="login"
            value={login}
            onChange={handleChange}
          >
          </input>
          <input type="password"
            id='password'
            className='form-control'
            name="password"
            value={password}
            onChange={handleChange}
          >
          </input>
          <input type="submit"
            value="Войти"
            onClick={handleLogin}>

          </input>
        </div>
        <div className='addition-buttons'>
          <NavLink to="/register" className="register-link">Register</NavLink>
        </div>
      </div>

    </div>
  )
}