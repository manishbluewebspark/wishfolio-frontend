'use client'
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import profile from "../images/Male15.png";
import myordericon from "../images/lovely.png";
import GNdetailsicon from "../images/edit-2.png";
import changepass from "../images/note-2.png";
import howiticon from "../images/message-question.png";
import imageUploadButton from "../images/imageUploadButton.png";
import userAvatar from "../images/userAvatar.jpg";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import LogoutModal from "../Components/Modals/LogoutModal"; // Import the new LogoutModal component
import "./style.css";
import { fetchUserData } from "../store/slices/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State for managing modal visibility

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

        // Handle successful upload
        console.log("Image uploaded successfully", response.data);
        // Optionally update the user profile image URL after upload
        dispatch(fetchUserData(userData._id));
      } catch (error) {
        console.error("Error uploading the image", error);
      }
    }
  };

  return (
    <div className="pf-profile-container container">
      {/* Top Section with Profile Image and User Information */}
      <div className="pf-header text-center position-relative">
        <Image
          src={
            userData?.imageUrl
              ? `${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${userData?.imageUrl}`
              : userAvatar
          }
          alt="Profile Picture"
          className="pf-profile-image"
          width={137}
          height={137}
        />
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
        <h4 className="pf-user-name">{userData?.name}</h4>
        <p className="pf-phone-number">{userData?._id}</p>
      </div>

      {/* Balance Section with "Deposit" Button */}
      <div className="pf-balance-section">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="pf-balance-label">Available Balance</p>
            <h3 className="pf-balance-amount">₹{userData?.accountBalance}</h3>
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
      <div className="pf-menu mt-3">
        <div
          className="pf-menu-item d-flex align-items-center"
          onClick={() => router.push("/orderhistorypage")}
        >
          <span className="pf-icon-con">
            <Image src={myordericon} alt="Orders" width={20} height={20} />
          </span>
          <span>My Orders</span>
        </div>

        <div
          className="pf-menu-item d-flex align-items-center"
          onClick={() => router.push("/generaldetailpage")}
        >
          <span className="pf-icon-con">
            <Image
              src={GNdetailsicon}
              alt="General Details"
              width={20}
              height={20}
            />
          </span>
          <span>General Details</span>
        </div>

        <div
          className="pf-menu-item d-flex align-items-center"
          onClick={() => router.push("/howitworkpage")}
        >
          <span className="pf-icon-con">
            <Image src={howiticon} alt="Help" width={20} height={20} />
          </span>
          <span>How is it working?</span>
        </div>

        <div className="pf-menu-item d-flex align-items-center" 
        onClick={() => router.push("/termsandconditions")}
        >
          <span className="pf-icon-con">
            <Image src={changepass} alt="Terms" width={20} height={20} />
          </span>
          <span>Terms & Conditions</span>
        </div>
      </div>

      {/* Logout Button */}
      <div className="pf-menu-item d-flex align-items-center justify-content-center just mt-4">
        <button className="pf-logout-button" onClick={() => setIsLogoutModalOpen(true)}>
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
