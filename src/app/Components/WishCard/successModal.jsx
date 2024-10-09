"use client";
import { useEffect } from "react";
import Image from "next/image";
import img2 from "../../images/69.png";
const SuccessModal = ({ showModal, handleClose }) => {
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  return (
    <div
      className={`bottom-modal ${showModal ? "open" : ""}`}
      style={{ height: "45vh" }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={handleClose} className="close-btn">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <Image src={img2} alt={"title"} width={100} height={100} />
          <div className="product-details">
            <p className="success-heading">You are the best!</p>

            <p className="success-title">Thanku you for your donation!</p>

            <div className="donate-section">
              <button onClick={handleClose} className="donate-btn">
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
