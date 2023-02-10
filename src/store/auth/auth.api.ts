import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResult, LoginRequest, RegisterRequest, UserModel } from "./auth.type";



export const authApi=createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://localhost:7197",
        
    }),
    endpoints:(builder)=>({
        loginUser:builder.mutation<AuthResult,LoginRequest>({
            query:(body:{login:string,password:string})=>{
                return{
                    url:"api/User/SignIn",
                    method:"POST",
                    body,
                };
            },}),
        registerUser:builder.mutation<AuthResult,RegisterRequest>({
            query:(body:{login:string,password:string,email:string})=>{
                return{
                    url:"api/User/Register",
                    method:"POST",
                    body,
                };
            }
        }),

        getUserById:builder.query<UserModel,number>({
            query:(id:number)=>{
                return{
                    url:`api/User?id=${id}`,
                    method:"GET"
                };
            }
        }),
        }),
    });

 export const {useLoginUserMutation,useRegisterUserMutation,useGetUserByIdQuery}=authApi