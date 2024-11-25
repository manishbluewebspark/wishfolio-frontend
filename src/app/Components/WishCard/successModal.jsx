"use client";
import { useEffect } from "react";
import Image from "next/image";
import img2 from "../../images/69.svg";
const SuccessModal = ({ showModal, handleClose }) => {
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  return (
    <div
      className={`bottom-modal ${showModal ? "open" : ""}`}
      style={{height:'auto' , padding:'22px'}}
    >
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={handleClose} className="smcb-close-btn">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <Image src={img2} alt={"title"} width={100} height={100} style={{marginBottom:'26.66px'}} />
          <div className="ss-product-details-con w-100" >
            <p className="success-heading">You are the best!</p>

            <p className="success-title">Thank you for your donation!</p>

            <div className="donate-section">
              <button onClick={handleClose} className="donate-btn w-100">
                Explore Wishes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
