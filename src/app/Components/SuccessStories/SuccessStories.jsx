"use client";
import Image from "next/image";
import React, { useState } from "react";
// import './style.css';
import img from "../../images/storiesimg.png";
import profileImage from "../../images/Male15.png";
import BackButton from "../Button/BackButton";
import Modal from "./SuccessModal"; // Import the Modal component
import SuccessModal from "./SuccessModal";

const SuccessStories = () => {
  const [selectedReview, setSelectedReview] = useState(null); // State to track the selected review

  const reviews = [
    {
      name: "Sinan CP",
      phoneImage: img,
      profileImage: profileImage,
      review: "Reviewed by",
    },
    {
      name: "Sinan CP",
      phoneImage: img,
      profileImage: profileImage,
      review: "Reviewed by",
    },
    {
      name: "Sinan CP",
      phoneImage: img,
      profileImage: profileImage,
      review: "Reviewed by",
    },
    // Add more reviews if necessary
  ];

  const openModal = (review) => {
    setSelectedReview(review);
  };

  const closeModal = () => {
    setSelectedReview(null);
  };

  return (
   <>
   <BackButton title={"Success Stories"}></BackButton>
     <div className="hw-sto-success-stories-container">
      <div className="hw-sto-stories-grid">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="hw-sto-story-card"
            onClick={() => openModal(review)}
          >
            <div className="hw-sto-phone-container">
              <Image
                src={review.phoneImage}
                alt="Phone mockup"
                width={187}
                height={200}
                className="hw-sto-phone-image"
              />
            </div>
            <div className="hw-sto-review-container">
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
        ))}
      </div>

      {/* Modal Component */}
      <SuccessModal review={selectedReview} closeModal={closeModal} />
    </div>
   </>
  );
};

export default SuccessStories;
