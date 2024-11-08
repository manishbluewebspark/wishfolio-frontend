import React from "react";
// import './style.css';
import Image from "next/image";
import logo from "../../images/tick-circle@3x.png"; // Replace with your actual logo
import './style.css';
import crossicon from '../../images/cross.svg';

const TransactionSubmitModal = ({ isOpen, onClose }) => {
  return (
    <div className={`tsm-deposit-modal-wrapper ${isOpen ? "show" : ""}`}>
      <div className="tsm-deposit-modal-content">
        <div className="tsm-modal-check-icon">
          <Image src={logo} height={30} width={30} alt="Check Icon" />
        </div>
        <h3>We Got Your Request</h3>
        <p>
        We have received your request. Please allow us 24 hours to process it. Once the amount is received in your Wishfolio account, you will receive a notification.
        </p>
        
        <div className="tsm-deposit-modal-buttons">
          <button className="tsm-button-wait" onClick={onClose}>
            Thanks, I will Wait
          </button>
        </div>
        <button className="tsm-button-cancel" onClick={onClose}>
          <Image src={crossicon} alt="x" height={9} width={9} ></Image>
        </button>
      </div>
    </div>
  );
};

export default TransactionSubmitModal;
