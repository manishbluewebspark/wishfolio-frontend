// pages/profile.js
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import profile from "../images/Male15.png";
import myordericon from "../images/lovely.png";
import GNdetailsicon from "../images/edit-2.png";
import changepass from "../images/note-2.png";
import howiticon from "../images/message-question.png";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { fetchUserData } from "../store/slices/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { userData, isLoading, error } = useSelector((state) => state.user);
  useEffect(() => {
    const getUserData = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const uData = JSON.parse(userData);
        dispatch(fetchUserData(uData.id));
      }
    };

    getUserData(); // Call the function
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };
  return (
    <div className="pf-profile-container container">
      {/* Top Section with Profile Image and User Information */}
      <div className="pf-header text-center">
        {/* profile */}
        <Image
          src={`${process.env.NEXT_PUBLIC_FILE_ACCESS_URL}/${userData?.imageUrl}`}
          alt="Profile Picture"
          className="pf-profile-image"
          width={137}
          height={137}
        />
      </div>

      <div className="pf-header-2">
        <h4 className="pf-user-name">Hello {userData?.name}</h4>
        <p className="pf-phone-number">{userData?.mobile}</p>
      </div>

      {/* Balance Section with "Deposit" Button */}
      <div className="pf-balance-section">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="pf-balance-label">Available Balance</p>
            <h3 className="pf-balance-amount">₹{userData?.accountBalance}</h3>
          </div>
          <button
            onClick={() => router.push("/paymentmethodpage")}
            className="pf-deposit-button"
          >
            Deposit
          </button>
        </div>
      </div>

      {/* Menu Section with List Items */}
      <div className="pf-menu mt-3">
        <div className="pf-menu-item d-flex align-items-center">
          <span className="pf-icon-con">
            <Image src={myordericon} alt="Orders" width={20} height={20} />
          </span>
          <span>My Orders</span>
        </div>

        <div className="pf-menu-item d-flex align-items-center">
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

        <div className="pf-menu-item d-flex align-items-center">
          <span className="pf-icon-con">
            <Image
              src={changepass}
              alt="Change Password"
              width={20}
              height={20}
            />
          </span>
          <span>Change Password</span>
        </div>

        <div className="pf-menu-item d-flex align-items-center">
          <span className="pf-icon-con">
            <Image src={howiticon} alt="Help" width={20} height={20} />
          </span>
          <span>How is it working?</span>
        </div>

        <div className="pf-menu-item d-flex align-items-center">
          <span className="pf-icon-con">
            <Image src={changepass} alt="Terms" width={20} height={20} />
          </span>
          <span>Terms & Conditions</span>
        </div>
      </div>

      {/* Logout Button */}
      <div className="pf-menu-item d-flex align-items-center justify-content-center just mt-4">
        <button className="pf-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
