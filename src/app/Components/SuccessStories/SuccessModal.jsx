import Image from "next/image";
import React, { useEffect, useRef } from "react";

const SuccessModal = ({ review, closeModal }) => {
  const modalRef = useRef(null); // Create a ref for the modal

  // Close modal when clicking outside of the modal content
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    // Bind the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Run effect only once on mount

  if (!review) return null; // If no review is selected, don't render anything.

  return (
    <div className="hw-sto-modal">
      <div className="hw-sto-modal-content" ref={modalRef}>
        <span className="hw-sto-close" onClick={closeModal}>
          &times;
        </span>
        <Image
          src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${review.imageUrl}`}
          alt="Phone mockup"
          width={260}
          height={278.07}
          className="hw-sto-phone-image-popup"
        />
        <div className="hw-sto-review-text-modal">
        <p>Reviewed by </p>
          <Image
            src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${review.userImageUrl}`}
            alt="Reviewer profile"
            width={14}
            height={14}
            className="hw-sto-profile-image"
          />
          <p className="">{review.name}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
