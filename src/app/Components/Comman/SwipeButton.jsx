"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import righticon from "../../images/arrow-rightwhite.svg";

const SwipeButton = ({ handleSwipe, isSwipable }) => {
  const [isSwiped, setIsSwiped] = useState(false);

  const onSwipe = () => {
    if (!isSwipable) {
      alert("Please select a product first.");
      return;
    }
    setIsSwiped(true);
    handleSwipe();
  };

  return (
    <div className="swipe-button-container">
      <div
        className={`swipe-button ${isSwiped ? "swiped" : ""} ${
          !isSwipable ? "disabled" : ""
        }`}
        onClick={isSwipable ? onSwipe : null} // Only trigger onSwipe if isSwipable is true
      >
        {/* <div className={`swipe-icon ${!isSwipable ? 'disabled' : ''}`}>
          <Image src={righticon} alt="Swipe Icon" color='white' />
        </div> */}
        <div className={`swipe-text ${!isSwipable ? "disabled" : ""} `}>
          Submit to Post My Wish
        </div>
      </div>
    </div>
  );
};

export default SwipeButton;
