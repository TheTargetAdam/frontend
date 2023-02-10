import "./Modal.css"

import React, { Dispatch } from "react"
import { JsxElement } from "typescript"

export interface IModalProps{
    modalActive:boolean,
    setModalActive:Dispatch<React.SetStateAction<boolean>>
    children:React.ReactNode
}
export const Modal=({modalActive,setModalActive,children}:IModalProps)=>{
    return (
        <div className={modalActive?"modal active":"modal"} onClick={()=>setModalActive(false)}>
            <div className="modal__content" onClick={e=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}