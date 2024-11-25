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

const NewAddressModal = ({ isOpen, onClose, onConfirm, addressData }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const router = useRouter(); // FIX: Ensure useRouter is used properly
  // console.log("addressData========", addressData);

  const [state, setState] = useState("Kerala");
  const [city, setCity] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  useEffect(() => {
    // Populate the form with `addressData` if available
    if (addressData) {
      setState(addressData.state || "Kerala");
      setCity(addressData.city || "");
      setAddressLine1(addressData.address_line_1 || "");
      setAddressLine2(addressData.address_line_2 || "");
      setPinCode(addressData.pincode || "");
      setRoomNumber(addressData.roomNumber || "");
    } else {
      setState("Kerala");
      setCity("");
      setAddressLine1("");
      setAddressLine2("");
      setPinCode("");
      setRoomNumber("");
    }
  }, [addressData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      state,
      city,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      pincode: pinCode,
      roomNumber,
      userId: userData?._id,
    };

    try {
      let response;
      if (!addressData) {
        // Case: No data, create a new address
        response = await axios.post(
          `${API_BASE_URL}/user/addAddress`,
          formData
        );
      } else if (addressData.userId) {
        // Case: Address exists, update the existing address
        response = await axios.patch(
          `${API_BASE_URL}/user/updateAddress/${addressData._id}`,
          formData
        );
      } else {
        // Case: Update user's profile
        const userUpdateData = {
          state,
          // city,
          address_line_1: addressLine1,
          address_line_2: addressLine2,
          pincode: pinCode,
          roomNumber,
        };
        response = await axios.patch(
          `${API_BASE_URL}/user/profile/${userData._id}`,
          userUpdateData
        );
      }

      if (response?.status === 200 || response?.status === 201) {
        toast.success("Address saved successfully!");
        onConfirm && onConfirm(); // Trigger success modal or action
        onClose(); // Close modal after success
      }
    } catch (error) {
      console.error("Error handling address:", error);
      toast.error("An error occurred while saving the address.");
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
                    <div className="input-container mb-2">
                      <select
                        className="form-select custom-select"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="Kerala">Kerala</option>
                        {/* Add other states */}
                      </select>
                    </div>
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
                        className="custom-input"
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
                    <div className="d-grid mt-2 mb-4">
                      <button
                        type="submit"
                        className="em-btn-complete"
                        style={{ color: "black" }}
                      >
                        Complete
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
