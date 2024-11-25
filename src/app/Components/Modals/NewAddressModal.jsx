"use client";
import React from "react";
import Image from "next/image";
import logoIcon from "../../images/Snow.svg"; // Replace with your logo
import { useRouter } from "next/navigation";
import crossicon from "../../images/cross.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUserData } from "../../store/slices/userSlice";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { toast } from "react-toastify";

const NewAddressModal = ({ isOpen, onClose, onConfirm }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const router = useRouter(); // FIX: Ensure useRouter is used properly

  // const [country, setCountry] = useState("India");
  const [state, setState] = useState("Kerala");
  const [city, setCity] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      //  country,
      state,
      city,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      pincode: pinCode,
      roomNumber,
      userId: userData._id,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/addAddress`,
        formData
      );
      if (response.status === 201) {
        // Optional: Trigger success modal or notification
        onConfirm && onConfirm(); // If function provided, call it
        // alert("Address submitted successfully!");
        toast.success("Address submitted successfully!");
        // Reset the form fields after successful submission
        // setCountry("India");
        setState("Kerala");
        setCity("");
        setAddressLine1("");
        setAddressLine2("");
        setPinCode("");
        setRoomNumber("");

        // Optionally redirect or close modal
        onClose(); // Close modal after success
      }
    } catch (error) {
      console.error("Error submitting address:", error);
      alert("An error occurred while submitting your address.");
    }
  };

  return (
    <div className={`pf-logout-modal-wrapper ${isOpen ? "show" : ""}`}>
      <div className="delivery-address-modal-content">
        <div className="delivery-address-modal-main-container">
          <div className="delivery-address-container">
            <div className="npmc-close-btn-con" onClick={onClose}>
              <button className="npmc-close-btn">
                <Image src={crossicon} height={9} width={9} alt="x"></Image>
              </button>
            </div>
            <div className="delivery-address-box text-center">
              {/* Logo */}
              <div className="delivery-address-box-top">
                <div className="delivery-address-box-logo">
                  <Image
                    src={logoIcon}
                    alt="Logo"
                    className="logo-img"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="address-form">
                  <h4 className="delivery-address-text-head-modal">
                    Enter Your Delivery Address
                  </h4>
                  <p className="delivery-address-subtext-modal">
                    Start your journey by adding your address
                  </p>

                  <form onSubmit={handleSubmit}>
                    {/* Dropdown for country */}
                    {/* <div className="input-container mb-3">
                <select
                  className="form-select custom-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="India">🇮🇳 India</option>
                 
                </select>
              </div> */}

                    {/* Dropdown for state */}
                    <div className="input-container mb-2">
                      <select
                        className="form-select custom-select"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>

                    {/* Input fields for City, Address Line 1, Address Line 2, PIN Code, Room Number */}
                    <div className="input-container mb-2">
                      <input
                        type="text"
                        className="custom-input"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-container mb-2">
                      <input
                        type="text"
                        className="custom-input"
                        placeholder="Address Line 1"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-container mb-2">
                      <input
                        type="text"
                        className="custom-input"
                        placeholder="Address Line 2"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                      />
                    </div>
                    <div className="input-container mb-2">
                      <input
                        type="text"
                        className=" custom-input"
                        placeholder="PIN Code"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-container mb-2">
                      <input
                        type="text"
                        className="custom-input"
                        placeholder="Room Number"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                      />
                    </div>

                    {/* Complete button */}
                    <div className="d-grid mt-2 mb-4">
                      <button
                        type="submit"
                        className="em-btn-complete"
                        style={{ color: "black" }}
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAddressModal;
