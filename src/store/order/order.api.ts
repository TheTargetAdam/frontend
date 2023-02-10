import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState"
import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle"
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { store, TypeRootState } from "../store"
import { IOrder, IOrderResponse, IUpdateOrder } from "./order.type"

// ,prepareHeaders:(headers,{getState})=>{
//   const token=store.getState().auth.token
//   if(token){
//     headers.set('Authorization',`Bearer ${token}`)
//   }
//   return headers
// }


export const productApi = createApi({
  reducerPath: "api/orders",
  tagTypes: ['orders'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7197' ,prepareHeaders:(headers,{getState})=>{
    // const { auth } = useTypedSelector(state => state);
    const token=(getState() as TypeRootState).auth.token
    if(token){
      headers.set('Authorization',`Bearer ${token}`)
    }
    return headers
  }}),
  endpoints: build => ({
    // getProducts:build.query<IOrderResponse,number>({
    //     // query:(count:number)=>`Orders/GetAllOrders`
    //     query:(page:number)=>({
    //         url:`api/orders?page=${page}`,
    //         responseHandler:(response)=>response.json()
    //     })
    // }),
    getProducts: build.query<IOrderResponse, { page: number; topics: string[] }>({
      query: (arg) => {
        const { page, topics } = arg;
        console.log('arg: ', arg);
        return {
          url: 'api/orders',
          params: { page, topics },
        };
      },
    }),
    getString: build.query<string, number>({
      query: (count: number) => ({
        url: `Orders/GetAllOrdersstring`,
        responseHandler: (response) => response.text()
      })
    }),
    getUserProducts: build.query<IOrderResponse, { page: number; userId: number }>({
      query: (arg) => {
        const { page, userId } = arg;
        console.log('arg: ', arg);
        return {
          url: 'api/orders/userId',
          params: { page, userId },
        };
      },
      providesTags: (result) =>
        result
          ? [
            ...result.orders.map(({ id }) => ({ type: 'orders' as const, id })),
            { type: 'orders', id: 'LIST' },
          ]
          : [{ type: 'orders', id: 'LIST' }],
    }),
    deleteOrder: build.mutation<void, number>({
      // query:(count:number)=>`Orders/GetAllOrders`
      query: (orderId: number) => ({
        url: `api/orders?id=${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'orders', id: 'LIST' }]
    }),
    updateOrder: build.mutation<void, {id:number,title:string,description:string,cost:number,topic:string}>({
      query: ({ id,...patch}) => {
        return {
          url: `api/orders?id=${id}`,
          method: "PUT",
          body:patch,
        };
      },invalidatesTags:[{type:'orders',id:'LIST'}]
    }),

    addOrder: build.mutation<void, {title:string,period:string,description:string,CreatorId:number,cost:number,topic:string}>({
      query: (body:{title:string,period:string,description:string,CreatorId:number,cost:number,topic:string}) => {
        return {
          url:"api/orders",
          method: "POST",
          body,
        };
      },invalidatesTags:[{type:'orders',id:'LIST'}]
    }),
  }
  ),
})


// prepareHeaders(headers, {getState}) {
//     headers.set('Access-Control-Allow-Origin', '*')
//     return headers
// },
// export const productApi=createApi({
//     reducerPath:"api/orders",
//     baseQuery:fetchBaseQuery({baseUrl:'http://fakestoreapi.com/'}),
//     endpoints:build=>({
//         getProducts:build.query<IOrder[],number>({
//             query:(count:number)=>`Orders?limit=${count}`,
//         }),
//     }),
// })


export const { useGetProductsQuery, useGetStringQuery, useGetUserProductsQuery, useDeleteOrderMutation, useUpdateOrderMutation , useAddOrderMutation } = productApi