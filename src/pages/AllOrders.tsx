import React, { useEffect, useState } from "react";
import { useGetProductsQuery, useGetStringQuery } from "../store/order/order.api";
import OrderItem from "../components/OrderItem"
import './AllOrders.css'
import isNaN from "lodash/isNaN";
import { IOrder, orderType } from "../store/order/order.type";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Pagination } from "../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { Categories } from "../components/Categories";

const initstate: IOrder[] = []
export function AllOrders() {
    const initialState: string[] = []
    const [categories, setCategories] = useState(initialState)
    const { addOrders } = useActions();
    const navigate = useNavigate();
    const location = useLocation();
    const pageNumber = !isNaN(Number(location.search.split("=")[1]))
        ? Number(location.search.split("=")[1])
        : 1;
    const [ordersData, SetOrders] = useState(initstate)
    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(pageNumber);
    const { data, isLoading, error } = useGetProductsQuery({page:currentPage,topics:categories})
    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
        navigate(`/allOrders/?page=${selected + 1}`)
    };

    const categoriesHandler = (event: any) => {
        if (!categories.includes(event.target.name))
            setCategories([...categories, event.target.name])
        else {
            setCategories((prev) => {
                return prev.filter(e => e !== `${event.target.name}`)
            })
        }
        setCurrentPage(1)
        navigate("/allOrders/?page=1")
    }

    useEffect(() => {
        if (!isLoading) {
            var total =0;
            var perPage=0;
            if(data?.totalCountItems)
                total=+data.totalCountItems
            if(data?.itemsPerPage)
                perPage=+data.itemsPerPage
            const pagesQuantity =  Math.max(Math.ceil(total / perPage), 1)
            if (data) {
                addOrders(data.orders as IOrder[])
            }
            const fetchPr = async () => {
                await SetOrders(data?.orders as IOrder[])
            }
            fetchPr();
            if (pagesQuantity) {
                setPagesCount(pagesQuantity);
            }
        }
    }, [currentPage, categories, isLoading,data])
    return (
        <div className="all-container">
            <div className="left-container">
                
                <div className="filter-container">

                    <Categories categoriesHandler={categoriesHandler} />
                </div>
            </div>

            <div className="orders-container">
                <h4 className="orders-header">Все заказы</h4>
                {isLoading ? (
                    'Loading...'
                ) : error ? (
                    <div>Error</div>
                ) : (
                    <div className='flex flex-wrap justify-between'>
                        {data?.orders && data.orders.map(order => (
                            <OrderItem key={order.id} order={order} />
                        ))}
                    </div>
                )}
                <div className="paginations-allorders"><Pagination
                    pagesCount={pagesCount}
                    onChange={handlePageChange} /></div>     
            </div>
        </div>
    )
}