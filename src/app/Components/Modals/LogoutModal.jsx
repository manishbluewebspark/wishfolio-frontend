import React from "react";
// import './style.css';
import Image from "next/image";
import logo from "../../images/snow.png";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`pf-logout-modal-wrapper ${isOpen ? "show" : ""}`}>
      <div className="pf-logout-modal-content">
        <Image src={logo} height={32} width={32}></Image>
        <h3>Logout?</h3>
        <p>Are you sure you want to log out?</p>

        <div className="pf-logout-modal-buttons">
          <button className="pf-button-confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="pf-button-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
