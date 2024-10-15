"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import "./wishconfirm.css";
import icon from "../images/77.png";

const WishConfirmation = () => {
  const router = useRouter(); // Initialize useRouter

  // Function to handle button click
  const handleGoToMyWishes = () => {
    router.push("/mywish");
  };

  return (
    <div className="container text-center d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="mt-4">
        <Image src={icon} alt="Wish illustration" width={100} height={100} />
      </div>
      <h2 className="mt-3">Wohoo!</h2>
      <p>
        Your wish list has been shared worldwide. Let others donate to make your
        wish come true—good luck!
      </p>
      <button
        className="btn btn-primary btn-lg mt-4"
        onClick={handleGoToMyWishes} // Add onClick handler
      >
        Go To My Wishes
      </button>
    </div>
  );
};

export default WishConfirmation;
