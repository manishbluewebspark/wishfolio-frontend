"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import profile from "../images/Male15.png";
import myordericon from "../images/lovely.svg";
import GNdetailsicon from "../images/edit-2.svg";
import changepass from "../images/note-2.svg";
import howiticon from "../images/message-question.svg";
import imageUploadButton from "../images/Group1321314246.svg";
import userAvatar from "../images/profile.svg";
import CurrencyName from "../Components/Comman/CurrencyName";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import LogoutModal from "../Components/Modals/LogoutModal";
import { fetchUserData } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import righticon from "../images/arrow-short-right.svg";
import LoginComponent from "../Components/LoginComponent/LoginComponent"; // Import LoginComponent

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State for managing modal visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for tracking if the user is logged in

  const { userData, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const getUserData = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const uData = JSON.parse(user);
        setIsLoggedIn(true); // Set the user as logged in
        dispatch(fetchUserData(uData.id));
      } else {
        setIsLoggedIn(false); // Set the user as not logged in
      }
    };

    getUserData();
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Handle image upload click
  const handleImageUploadClick = () => {
    fileInputRef.current.click(); // Trigger hidden file input
  };

  // Handle file selection and upload
  const handleImageUpload = async (e) => {
    const file = e?.target?.files[0];
    if (file && userData) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id", userData._id);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          toast.success("Profile uploaded successfully");

          setTimeout(() => {
            dispatch(fetchUserData(userData._id));
          }, 2500);
        }
      } catch (error) {
        toast.error("Error uploading the image");
        console.error("Error uploading the image", error);
      }
    }
  };

  // Show the LoginComponent if the user is not logged in
  if (!isLoggedIn) {
    return <LoginComponent />;
  }

  return (
    <div className="pf-profile-container">
      {/* Top Section with Profile Image and User Information */}
      <div className="pf-header text-center position-relative">
        <div className="pf-img-thumnil">
          <Image
            src={
              userData?.imageUrl
                ? `${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${userData?.imageUrl}`
                : userAvatar
            }
            alt="Profile Picture"
            className="pf-profile-image"
            width={90}
            height={90}
          />
        </div>
        <Image
          src={imageUploadButton}
          alt="Upload Profile Picture"
          className="pf-profile-image-upload"
          width={36}
          height={36}
          onClick={handleImageUploadClick} // Trigger file input on button click
        />
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageUpload} // Call handleImageUpload on file selection
        />
      </div>

      <div className="pf-header-2">
        <h4 className="pf-user-name text-center">{userData?.name}</h4>
        <p className="pf-phone-number text-center">{userData?.userNumber}</p>
      </div>

      {/* Balance Section with "Deposit" Button */}
      <div className="pf-balance-section">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="pf-balance-label">Available Balance</p>
            <h3 className="pf-balance-amount">
              <CurrencyName />
              {userData?.accountBalance || "0"}
            </h3>
          </div>
          <button
            onClick={() => router.push("/predeposit")}
            className="pf-deposit-button"
          >
            Deposit
          </button>
        </div>
      </div>

      {/* Menu Section with List Items */}
      <div className="pf-menu">
        <div
          className="pf-menu-item d-flex justify-content-between align-items-center"
          onClick={() => router.push("/orderhistorypage")}
        >
          <div className="d-flex align-items-center">
            <span className="pf-icon-con">
              <Image src={myordericon} alt="Orders" width={20} height={20} />
            </span>
            <span className="pf-my-text">My Orders</span>
          </div>
          <div>
            <Image src={righticon} alt="Orders" width={20} height={20} />
          </div>
        </div>

        <div
          className="pf-menu-item justify-content-between d-flex align-items-center"
          onClick={() => router.push("/generaldetailpage")}
        >
          <div className="d-flex align-items-center">
            <span className="pf-icon-con">
              <Image
                src={GNdetailsicon}
                alt="General Details"
                width={20}
                height={20}
              />
            </span>
            <span className="pf-my-text">General Details</span>
          </div>
          <div>
            <Image src={righticon} alt="Orders" width={20} height={20} />
          </div>
        </div>

        <div
          className="pf-menu-item justify-content-between d-flex align-items-center"
          onClick={() => router.push("/howitworkpage")}
        >
          <div className="d-flex align-items-center">
            <span className="pf-icon-con">
              <Image src={howiticon} alt="Help" width={20} height={20} />
            </span>
            <span className="pf-my-text">How is it working?</span>
          </div>
          <div>
            <Image src={righticon} alt="Orders" width={20} height={20} />
          </div>
        </div>

        <div
          className="pf-menu-item justify-content-between d-flex align-items-center"
          onClick={() => router.push("/termsandconditions")}
        >
          <div className="d-flex align-items-center">
            <span className="pf-icon-con">
              <Image src={changepass} alt="Terms" width={20} height={20} />
            </span>
            <span className="pf-my-text">Terms & Conditions</span>
          </div>
          <div>
            <Image src={righticon} alt="Orders" width={20} height={20} />
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="d-flex align-items-center pf-logout-menu justify-content-center">
        <button
          className="pf-logout-button"
          onClick={() => setIsLogoutModalOpen(true)}
        >
          Logout
        </button>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Profile;
