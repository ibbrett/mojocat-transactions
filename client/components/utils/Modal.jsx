import React from "react";
import {AiFillCloseCircle} from  "react-icons/ai";  // 'react-icons/fa'

const Modal = ({ children, showModal, closeModal, label }) => {
  return showModal ? (
    <div className="modal">
      <div className="window">
        <header>
          <label>{label}</label>
          <div className="exit" onClick={closeModal}><AiFillCloseCircle /></div>
        </header>
        {children}
      </div>
    </div>
  ) : (null);
};

export { Modal };
