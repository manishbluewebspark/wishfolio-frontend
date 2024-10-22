import Image from "next/image";
import React from "react";
// import './style.css';

const SuccessModal = ({ review, closeModal }) => {
  if (!review) return null; // If no review is selected, don't render anything.

  return (
    <div className="hw-sto-modal">
      <div className="hw-sto-modal-content">
        <span className="hw-sto-close" onClick={closeModal}>
          &times;
        </span>
        <Image
          src={review.phoneImage}
          alt="Phone mockup"
          width={260}
          height={278.07}
          className="hw-sto-phone-image-popup"
        />
        <div className="hw-sto-review-text">
          <p>{review.review}</p>
          <Image
            src={review.profileImage}
            alt="Reviewer profile"
            width={14}
            height={14}
            className="hw-sto-profile-image"
          />
          <p className="hw-sto-reviewer-name">{review.name}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
