import {configureStore, getDefaultMiddleware, Store} from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { authApi } from "./auth/auth.api"
import { userReducer } from "./auth/auth.slice"
import { productApi } from "./order/order.api"
import { ordersReducer } from "./order/orders.slice"

export const  store=configureStore({
    reducer:{[productApi.reducerPath]:productApi.reducer,orders:ordersReducer,[authApi.reducerPath]:authApi.reducer,auth:userReducer},
    middleware:getDefaultMiddleware=>
        getDefaultMiddleware().concat(productApi.middleware),
})
setupListeners(store.dispatch)
export type TypeRootState=ReturnType<typeof store.getState>

