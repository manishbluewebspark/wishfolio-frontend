"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import img from "../../images/storiesimg.png";
import profileImage from "../../images/profile.svg";
import BackButton from "../Button/BackButton";
import SuccessModal from "./SuccessModal"; // Import the Modal component
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const SuccessStories = () => {
  const [reviews, setReviews] = useState([]); // State for storing reviews
  const [selectedReview, setSelectedReview] = useState(null); // State to track the selected review
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch success stories from the API
  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/user/getSuccessStories?status=1`
        ); // Call your API endpoint
        setReviews(response.data?.data || []); // Set reviews or empty array
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch success stories.");
        setLoading(false);
      }
    };

    fetchSuccessStories();
  }, []);

  const openModal = (review) => {
    setSelectedReview(review);
  };

  const closeModal = () => {
    setSelectedReview(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message if API call fails
  }

  // If there are no reviews, show a "No success stories available" message
  if (reviews.length === 0) {
    return (
      <div>
        <BackButton title={"Success Stories"}></BackButton>
        <div className="hw-sto-success-stories-container">
          <p>No success stories available at the moment.</p>
        </div>
      </div>
    );
  }

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
                  src={
                    `${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${review.imageUrl}` ||
                    img
                  } // Use a fallback image if needed
                  alt="Phone mockup"
                  width={187}
                  height={200}
                  className="hw-sto-phone-image"
                />
              </div>
              <div className="hw-sto-review-container">
                <div className="hw-sto-review-text">
                  <p style={{color:"#A48888"}}>Reviewed by </p>
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${review.userImageUrl}` ||
                      profileImage
                    } // Use fallback profile image
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
