import Modal from 'react-modal';
import { FC } from 'react'
import {useState} from "react"
import "./EditModal.css"
export interface IModalProps {
    showEdit: boolean,
    closeModal: () => void,
}
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        marginTop:"10px",
        transform: 'translate(-50%, -50%)',
    },
};
export const EditModal: FC<IModalProps> = ({ showEdit, closeModal }) => {
    
    return (
        <div>
            <Modal
                isOpen={showEdit}
                onRequestClose={closeModal}
                // style={customStyles}
                className="Modal"
                contentLabel="Example Modal"

            >
            
                <div>I am a modal</div>
                <form>
                    <input ></input>

                    <input></input>
                </form>
                <button onClick={closeModal}>close</button>
            </Modal>
        </div>
    )
}