import React from 'react'
import { FC, useState } from 'react'
import { IOrder } from "../store/order/order.type"
import "./OrderItem.css"
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet } from "react-router-dom"
import { EditModal } from './EditModal'
import { EditForm } from './EditForm'



import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useGetUserByIdQuery } from '../store/auth/auth.api'

export interface IOrderItemProps {
	order: IOrder,
	auth?: {
		id: number | null;
		name: string | null;
		token: string | null;
	}
	deleteOrder?: (id: number) => void;
	editOrder?: (id: number, title: string, description: string, cost: number, topic: string) => void;
}
const initialState = {
	title: "",
	description: "",
	cost: "",
	topic: ""
}
const OrderItem: FC<IOrderItemProps> = ({ order, auth, deleteOrder, editOrder }) => {
	const [editModal, setEditModal] = useState(false)
	const [formValue, setFormValue] = useState(initialState)
	const { title, description, cost, topic } = formValue
	const { data, error } = useGetUserByIdQuery(order.creatorId)
	const closemodal = () => {
		setEditModal(false)
	}
	const showmodal = () => {
		setEditModal(true)
	}

	const handleChange = (e: any) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value })
	}
	return (
		<div
			className='order-container'
		>
			<div className="order-content">
				<div className='title-cost'>
					<Link to={`/allorders/${order.id}`} className="nav-link">
						<h2>{order.title}</h2></Link>
					<h3>{order.cost + "₽"}</h3>
				</div>
				<div className="order-description">
					<p>{order.description}</p>
				</div>
				<div className="order-credentials">
					<div className='order-topic'>{"Категория:" + order.topic}</div>
					<div className='order-date'>{"Срок выполнения:" + order.period}</div>
					<div className='creator-email'> {"Обращаться на почту:" + data?.email}</div>
				</div>
				{auth && deleteOrder && <div className='crud-buttons'>
					<button className="order-delete-button" onClick={() => deleteOrder(order.id)}>Delete</button>
					<button className="order-edit-button" onClick={() => setEditModal(true)}	>Edit</button>
				</div>}


				<Modal show={editModal} onHide={closemodal}>
					<Modal.Header closeButton>
						<Modal.Title>Add Order</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="email"
									autoFocus
								/>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlTextarea1"
							>
								<Form.Label>Description</Form.Label>
								<Form.Control as="textarea" rows={3}  />
							</Form.Group>

							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Cost</Form.Label>
								<Form.Control
									type="email"
									autoFocus

								/>
							</Form.Group>


							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Topic</Form.Label>
								<Form.Control
									type="email"
									autoFocus
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Period</Form.Label>
								<Form.Control
									type="email"
									autoFocus
								/>
							</Form.Group>

						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closemodal}>
							Close
						</Button>
						<Button variant="primary" onClick={closemodal}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>


			</div>
		</div>
	)
}

export default OrderItem 