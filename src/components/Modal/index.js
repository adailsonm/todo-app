import React from "react";
import './index.css'
const Modal = ({ id = "modal", onClose = () => {}, children }) => {
    const handleOutsideClick = (e) => {
        if(e.target.id === id) onClose();
    }
    return (
        <div id="modal" className="modal" onClick={handleOutsideClick}>
            <div className="containerModal">
                <button className="close" onClick={onClose}></button>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Modal;