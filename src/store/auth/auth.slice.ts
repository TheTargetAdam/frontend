import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { useNavigate } from "react-router-dom";

export interface AuthState{
    id:number |null;
    name:string | null;
    token:string | null;
}

const initialState:AuthState={
    id:null,
    name:null,
    token:null
}
export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<{id:number,name:string,token:string}>)=>{
            localStorage.setItem("user",JSON.stringify({
                id:action.payload.id,
                name:action.payload.name,
                token:action.payload.token
            }))
            state.id=action.payload.id;
            state.name=action.payload.name;
            state.token=action.payload.token;
        },
        logout:(state)=>{
            localStorage.clear();
            state.id=null;
            state.name=null;
            state.token=null;
        }
    }
})


export const userReducer=userSlice.reducer
export const userActions=userSlice.actions