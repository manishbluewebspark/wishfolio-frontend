"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import attachicon from "../../images/attach.png";
import attachRemoveicon from "../../images/IconSet2.svg";
import BackButton from "../Button/BackButton";
import TransactionSubmitModal from "../Modals/TransactionSubmitModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../store/slices/userSlice";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const PreDepositPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [transactionId, setTransactionId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const { userData, isLoading, error } = useSelector((state) => state.user);
  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/profile");
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("transactionId", transactionId);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    formData.append("userId", userData._id);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/deposit/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedImage(null);
    fileInputRef.current.value = ""; // Reset the input field
  };

  return (
    <div className="pta-container">
      <div className="">
        <BackButton title={"Back"} customeRoute="/profile"></BackButton>
      </div>

      <div>
        <form className="pta-input-section" onSubmit={handleSubmit}>
          <div className="pta-title">Enter Transaction ID</div>

          <input
            type="text"
            className="pta-input"
            placeholder="Transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            required
          />

          <input
            type="file"
            className="pta-upload-input"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />

          {!selectedImage ? (
            <a
              href="#"
              className="pta-upload-link"
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current.click();
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
          ) : (
            <div className="selected-file-container">
              <a href="#" className="pta-upload-link">
                Screenshot Attached
                <Image
                  onClick={removeFile}
                  src={attachRemoveicon}
                  width={20}
                  height={20}
                  alt="attach"
                  className="pta-attach"
                ></Image>
              </a>
              {/* <button
                type="button"
                className="remove-file-button"
                onClick={removeFile}
              >
                ✕
              </button> */}
            </div>
          )}

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
