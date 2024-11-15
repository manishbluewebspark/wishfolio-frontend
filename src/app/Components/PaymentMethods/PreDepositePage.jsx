"use client";

import "bootstrap/dist/css/bootstrap.min.css";
// import "./paymethod.css";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import arrowleftIcon from "../../images/arrow-left.png";
import BackButton from "../Button/BackButton";
import attachicon from "../../images/attach.png";
import TransactionSubmitModal from "../Modals/TransactionSubmitModal";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../store/slices/userSlice";
const PreDepositPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [transactionId, setTransactionId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [pendingDeposit, setPendingDeposit] = useState(null); // State to hold pending deposit data
  const [userId, setUserId] = useState("123"); // Placeholder for user ID, replace with actual user ID logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const { userData, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const getUserData = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const uData = JSON.parse(userData);
        dispatch(fetchUserData(uData.id));
      }
    };

    getUserData();
  }, []);
  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/profile");
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData();
    formData.append("transactionId", transactionId);
    formData.append("userId", userData._id);
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
        // router.push("/profile");
        setIsModalOpen(true);
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

  // Fetch pending deposit using user ID
  useEffect(() => {
    const fetchPendingDeposit = async () => {
      try {
        const user = localStorage.getItem("user");
        const uData = JSON.parse(user);
        const response = await axios.get(
          `${API_BASE_URL}/user/deposit/pending/${uData.id}`
        );

        // Assuming the response contains deposit data
        if (response.status === 200) {
          setPendingDeposit(response.data);
        }
      } catch (error) {
        console.error("Error fetching pending deposit:", error);
      }
    };

    fetchPendingDeposit();
  }, []);

  return (
    <div className="pta-container">
      <div className="">
        <BackButton title={"Back"} customeRoute="/profile"></BackButton>
      </div>
      {/* Pending Deposit Info Section */}
      {/* {pendingDeposit && ( */}
      <>
        <div>
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
              <Image
                src={attachicon}
                width={7.46}
                height={13.89}
                alt="attach"
                className="pta-attach"
              ></Image>
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
          <TransactionSubmitModal
            isOpen={isModalOpen}
            onClose={closeModal}
          ></TransactionSubmitModal>
        </div>

        <div className="pta-divider">
          <span className="pta-divider-text">OR</span>
        </div>
      </>
      {/* )} */}
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
