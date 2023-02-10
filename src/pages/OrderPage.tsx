import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import OrderItem from "../components/OrderItem";
import { useTypedSelector } from "../hooks/useTypedSelector";
import "./OrderPage.css"
export function OrderPage(){
    const {orders}=useTypedSelector(state=>state);
    const {ordersId}=useParams();
    const num_id=ordersId?+ordersId:null;
    const order=orders.find((item)=>item.id===num_id);
    return (       
        <div className="wrapper-page">

            <h3>Проект</h3>
            {order && <OrderItem key={order?.id} order={order} />}
        </div>
    )
}