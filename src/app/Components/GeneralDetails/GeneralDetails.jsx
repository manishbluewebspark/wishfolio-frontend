"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
// import "./style.css"; // Import custom styles
import leftArrowIcon from "../../images/arrow-left.png";
import Image from "next/image";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../store/slices/userSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import BackButton from "../Button/BackButton";
const GeneralDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  // Fetch user data from Redux state
  const { userData, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const getUserData = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const uData = JSON.parse(user);
        dispatch(fetchUserData(uData.id)); // Fetch data using user ID from localStorage
      }
    };

    getUserData();
  }, [dispatch]);

  // Update formData when userData is available
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        mobile: userData.mobile || "",
        email: userData.email || "",
      });
    }
  }, [userData]);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle Save button click
  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/${userData._id}`,
        formData
      );
      toast.success("Details Updated Successfully");
      // Optionally, you can handle success/failure UI here
    } catch (error) {
      toast.error("Something went to wrong");
    }
  };
  const handleBackClick = () => {
    router.back();
  };
  return (
    <div className="gd-profile-container">
      {/* Header with back button, title, and save button */}
      <div className="gd-header d-flex justify-content-between align-items-center">
        {/* <div className="d-flex">
          <Image
            src={leftArrowIcon}
            className="me-2"
            onClick={handleBackClick}
          ></Image>
          <h1 className="gd-title text-align-center">General Details</h1>
        </div> */}
        <BackButton title={"General Details"}></BackButton>
        <button className="gd-save-btn" onClick={handleSave}>
          Save
        </button>
      </div>

      <form className="gd-form-container">
        {/* Full Name Field */}
        <div className="form-group gd-input-group">
          <label htmlFor="name" className="gd-input-label">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control gd-input-field-right"
          />
        </div>

        {/* Phone Number Field */}
        <div className="form-group gd-input-group">
          <label htmlFor="mobile" className="gd-input-label">
            Phone Number
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="form-control gd-input-field-right"
          />
        </div>

        {/* Email Field */}
        <div className="form-group gd-input-group">
          <label htmlFor="email" className="gd-input-label">
            Gmail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            className="form-control gd-input-field-right"
          />
        </div>
      </form>
    </div>
  );
};

export default GeneralDetails;
