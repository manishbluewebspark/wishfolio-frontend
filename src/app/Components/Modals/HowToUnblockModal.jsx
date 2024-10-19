import React from "react";
import './style.css';
import Image from "next/image";
import logo from '../../images/snow.png';
import UnblockLevels from "../HowItWork/UnblockLevels";
import HowToUnblock from '../HowToUnblockImg/HowToUnblockImg';

const HowToUnblockModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`htum-unblock-modal-wrapper ${isOpen ? "show" : ""}`}>
      <div className="htum-unblock-modal-content">
      <UnblockLevels></UnblockLevels>
      {/* <HowToUnblock></HowToUnblock> */}
      <button className="htum-button-cancel" onClick={onClose}>
            X
        </button>
      </div>
    </div>
  );
};

export default HowToUnblockModal;
