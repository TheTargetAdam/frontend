import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ordersActions } from "../store/order/orders.slice";
import {userActions} from "../store/auth/auth.slice"
const allActions={
    ...ordersActions,
    ...userActions,
}

export const useActions=()=>{
    const dispatch=useDispatch()
    return bindActionCreators(allActions,dispatch)
}

export default useActions