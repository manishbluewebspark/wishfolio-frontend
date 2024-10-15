"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import "./wishconfirm.css";
import icon from "../images/86.png";

const OrderConfirmation = () => {
  const router = useRouter(); // Initialize useRouter

  // Function to handle button click
  const handleGoToMyWishes = () => {
    router.push("/myorder");
  };

  return (
    <div className="container text-center d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="mt-4">
        <Image src={icon} alt="Wish illustration" width={100} height={100} />
      </div>
      <h2 className="mt-3">We Got Your Request!</h2>
      <p>
        We've received your wish product request. It will be delivered to your
        address within 2-14 working days. Once you receive your product, please
        share your review with us.
      </p>
      <button
        className="btn btn-primary btn-lg mt-4"
        onClick={handleGoToMyWishes} // Add onClick handler
      >
        Go to My Orders
      </button>
    </div>
  );
};

export default OrderConfirmation;
