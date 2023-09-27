import React from "react";
import {AiFillCloseCircle} from  "react-icons/ai";  // 'react-icons/fa'



const Modal = ({ children, showModal, closeModal, label }) => {
  return showModal ? (
    <div className="modal-container">
      <div className="modal-window">
        <div className="modal-header">
          <label className="modal-label">{label}</label>
          <div className="modal-exit" onClick={closeModal}><AiFillCloseCircle /></div>
        </div>
        {children}
      </div>
    </div>
  ) : (null);
};

export { Modal };
