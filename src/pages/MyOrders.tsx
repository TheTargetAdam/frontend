import React, { useEffect, useState } from "react";
import "./MyOrders.css"
import { useAddOrderMutation, useDeleteOrderMutation, useGetProductsQuery, useGetUserProductsQuery, useUpdateOrderMutation } from "../store/order/order.api";
import { useLocation, useNavigate } from "react-router-dom";
import { IOrder } from "../store/order/order.type";
import useActions from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import OrderItem from "../components/OrderItem";
import { Pagination } from "../components/Pagination";
// import { Modal } from "../components/Modal";
import { Prev } from "react-bootstrap/esm/PageItem";
import { EditForm } from "../components/EditForm";



import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// import Modal from 'react-modal';
const initialState: IOrder[] = []
const initState = {
    title: "",
    description: "",
    cost: "",
    period: "",
    topic: "",
}
export function MyOrders() {
    const location = useLocation();
    const pageNumber = !isNaN(Number(location.search.split("=")[1]))
        ? Number(location.search.split("=")[1])
        : 1;
    const [showEdit, setShowEdit] = useState(true);
    const handleShow = () => setShowEdit(true);
    const handleClose = () => setShowEdit(false);
    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(pageNumber);
    const navigate = useNavigate();
    const { addOrders } = useActions();
    const { logout } = useActions();
    const { auth } = useTypedSelector(state => state);
    const [updateOrder, { }] = useUpdateOrderMutation();
    const [deleteOrder, { isSuccess }] = useDeleteOrderMutation()
    const [orders, setOrders] = useState(initialState)
    const { data, isLoading, error,status} = useGetUserProductsQuery({ page: currentPage, userId: auth.id as number })
    const [addModal, setaddModal] = useState(false)
    const [formValue, setFormValue] = useState(initState)
    const { title, description, cost, period, topic } = formValue
    const [addOrder, { }] = useAddOrderMutation()

    const[editModal,setEditModal]=useState(true)

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
        console.log(pageNumber)
        console.log("changing")
        navigate(`/myorders/?page=${selected + 1}`)
    };
    const updateOrderHandler = async (id: number, title: string, description: string, cost: number, topic: string) => {
        await updateOrder({ id, title, description, cost, topic })
    }
    const deleteOrderHandler = async (id: number) => {
        await deleteOrder(id);

    }

    const closemodal=()=>{
        setEditModal(false)
    }
    const openModal = () => {
        setShowEdit(true)
    }
    const closeModal = () => {
        setShowEdit(false)
    }
    const testbut = () => {
        console.log(orders)
    }
    const submitAdd = () => {
        addOrder({title:title,period:period,description:description,CreatorId:auth.id?auth.id:0,cost:+cost,topic:topic})
    }
    const handleChange = (e: any) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
    }

    useEffect(() => {

        if (!isLoading) {
            
            var total = 0;
            var perPage = 0;
            if (data?.totalCountItems)
                total = +data.totalCountItems
            if (data?.itemsPerPage)
                perPage = +data.itemsPerPage
            const pagesQuantity = Math.max(Math.ceil(total / perPage), 1)
            console.log(total + "total")
            console.log(perPage + "perpage")
            console.log(data + "data")
            if (data) {
                setOrders(data.orders as IOrder[])
            }
            if (pagesQuantity) {
                setPagesCount(pagesQuantity);
            }
            console.log(pagesQuantity + "pagesquant")
            console.log(currentPage + "currentPage")
        }
    }, [currentPage, data,error])
    return (
        <div className="orders-wrapper">
            {/* <button>Add Order</button> */}
            <div className="orders-container">
                <button className="button--primary" onClick={()=>setaddModal(true)}>Add Order</button>
                {isLoading ? (
                    'Loading...'
                ) : error ? (
                    <div>Error</div>
                ) : (
                    <div className='flex flex-wrap justify-between'>
                        {data?.orders && data?.orders.map(order => (
                            // (categories.length == 0 || categories.includes(order.title)) &&
                            <OrderItem key={order.id} order={order} auth={auth} deleteOrder={deleteOrderHandler} editOrder={updateOrderHandler} />
                        ))}
                    </div>
                )}
                <div className="pagination-wrapper">
                    <Pagination
                        // initialPage={1}
                        pagesCount={pagesCount}
                        onChange={handlePageChange} />
                </div>

                <button onClick={testbut}></button>
            </div>


            {addModal && <Modal modalActive={addModal} setModalActive={setaddModal}
                children={
                    <div className='modal-wrapper'>
                        <form className='modal-form'>
                            <div className='edit-title'>
                                <label>Title</label>
                                <input id='title' name='title' value={title} onChange={handleChange}></input>
                            </div>
                            <div className='edit-period'>
                                <label>Period</label>
                                <input id='title' name='title' value={period} onChange={handleChange}></input>
                            </div>
                            <div className='edit-description'>
                                <label>Description</label>
                                <input id='description' name='description' value={description} onChange={handleChange}></input>
                            </div>
                            <div className='edit-cost'>
                                <label>Cost</label>
                                <input id='cost' name='cost' value={cost} onChange={handleChange}></input>
                            </div>
                            <div className='edit-topic'>
                                <label>Topic</label>
                                <input id='topic' name='topic' value={topic} onChange={handleChange}></input>
                            </div>
                            <div className='confirm-button'>
                                {addModal && <button onClick={submitAdd}>Confirm</button>}
                            </div>
                        </form>
                    </div>
                }
            />}
        </div>
    )
}