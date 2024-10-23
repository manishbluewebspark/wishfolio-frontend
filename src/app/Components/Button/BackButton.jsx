"use client";
import React from "react";
import Image from "next/image"; // Assuming you're using Next.js Image component
import { useRouter } from "next/navigation"; // Import the useRouter hook
import leftArrowIcon from "../../images/arrow-left.png";
// import './style.css';

const BackButton = (props) => {
  const router = useRouter(); // Initialize the router
  console.log("props", props?.customeRoute);

  const handleBackClick = () => {
    if (props?.customeRoute) {
      router.push(props?.customeRoute);
    } else {
      router.back();
    }
  };

  return (
    <div>
      <div className="bck-header d-flex justify-content-between align-items-center container">
        <div className="d-flex ">
          <Image
            src={leftArrowIcon}
            className="me-2"
            alt="Back"
            onClick={handleBackClick}
            style={{ cursor: "pointer" }}
          />
          <h1 className="bck-title text-align-center">{props.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default BackButton;
