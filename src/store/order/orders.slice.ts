import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { IOrder } from "./order.type";

const initialState:IOrder[]=[]
export const orderSlice=createSlice({
    name:'orders',
    initialState,
    reducers:{
        addOrders:(state,action:PayloadAction<IOrder[]>)=>{
            state.splice(0,state.length)
            action.payload.forEach(element => {
                state.push(element)
            });

        }
    }
})


export const ordersReducer=orderSlice.reducer
export const ordersActions=orderSlice.actions