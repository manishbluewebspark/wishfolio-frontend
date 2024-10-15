"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./paymethod.css";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import arrowleftIcon from "../../images/arrow-left.png";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PreDepositPage = () => {
  const router = useRouter();

  // State to hold transaction ID and selected image
  const [transactionId, setTransactionId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Create a ref for the file input
  const fileInputRef = useRef(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData();
    formData.append("transactionId", transactionId);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/deposit/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for file upload
          },
        }
      );

      // Handle successful response
      if (response.status === 201) {
        router.push("/profile");
      }
      console.log("Success:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const handleBackClick = () => {
    router.push("/profile");
  };
  return (
    <div className="pta-container">
      <div className="">
        <button className="dp-back-btn" onClick={handleBackClick}>
          <Image
            src={arrowleftIcon}
            width={24}
            height={24}
            alt="Arrow Left Icon"
            className="mx-2"
          />
          Back
        </button>
      </div>
      {/* Transaction ID Input Section */}
      <form className="pta-input-section" onSubmit={handleSubmit}>
        <div className="pta-title">Enter Transaction ID</div>

        <input
          type="text"
          className="pta-input"
          placeholder="Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)} // Update state on input change
          required // Make it a required field
        />

        {/* Hidden file input */}
        <input
          type="file"
          className="pta-upload-input"
          accept="image/*" // Accept image files
          onChange={handleFileChange} // Update state when a file is selected
          ref={fileInputRef} // Attach the ref to this input
          style={{ display: "none" }} // Hide the input
        />

        <a
          href="#"
          className="pta-upload-link"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default link behavior
            fileInputRef.current.click(); // Trigger the file input click
          }}
        >
          Add Screenshot here
        </a>

        <p className="pta-description">
          Once you transferred the amount, please enter your transaction ID
          here.
        </p>

        <button type="submit" className="pta-submit-btn">
          Submit
        </button>
      </form>

      {/* Divider */}
      <div className="pta-divider">
        <span className="pta-divider-text">OR</span>
      </div>

      {/* New Deposit Section */}
      <div className="pta-deposit-section">
        <div className="pta-deposit-title">Make a New Deposit</div>

        <p className="pta-deposit-description">
          Create a new deposit transaction exclusively for users to add funds to
          your Wishfolio account.
        </p>

        <button
          className="pta-deposit-btn"
          onClick={() => router.push("/paymentmethodpage")}
        >
          Deposit
        </button>
      </div>
    </div>
  );
};

export default PreDepositPage;
