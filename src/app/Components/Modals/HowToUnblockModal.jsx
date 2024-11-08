import React from "react";
import Image from "next/image";
import logo from "../../images/snow.png";
import UnblockLevels from "../HowItWork/UnblockLevels";
import HowToUnblock from "../HowToUnblockImg/HowToUnblockImg";

const HowToUnblockModal = ({ isOpen, onClose, onConfirm }) => {
  const unblockLevelsClasses = "htum-Margin-top-class";
  const htumMarginClass ='htum-Margin-Class';
  return (
    <div className={`htum-unblock-modal-wrapper ${isOpen ? "show" : ""}`}>
      <div className="htum-unblock-modal-content">
        <UnblockLevels unblockLevelsClasses={unblockLevelsClasses} htumMarginClass={htumMarginClass} ></UnblockLevels>
        <button className="htum-button-cancel" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default HowToUnblockModal;
