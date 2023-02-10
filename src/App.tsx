import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import {HomePage} from './pages/HomePage'
import {Navigation} from "./components/Navigation"
import { AllOrders } from './pages/AllOrders';
import { OrderPage } from './pages/OrderPage';
import { MyOrders } from './pages/MyOrders';
import { Footer } from './components/Footer';
import { LoginForm } from './components/LoginForm';
import { useTypedSelector } from "./hooks/useTypedSelector";
import { Cabinet } from './components/Cabinet';
import {Register} from "./pages/Register"
import {useActions} from "./hooks/useActions"
function App() {
  const {auth}=useTypedSelector(state=>state)
  const {setUser}=useActions();
  const user=JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(()=>{
    setUser(user)
  },[user])
  return (
    <>
    <Navigation/>
    {(auth.name && auth.token)?<Cabinet name={user.name} token={user.token}/>:<LoginForm/>}
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/allOrders" element={<AllOrders/>}/>
      <Route path="/myOrders" element={<MyOrders/>}/>
      <Route path="/allOrders/:ordersId" element={<OrderPage/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
