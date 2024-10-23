"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // FIX: Import useRouter
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import "./style.css"; // Custom styles for modal
import { fetchUserData } from "../../store/slices/userSlice";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { toast } from "react-toastify";
const AddressModal = ({ showModal, handleClose, openSuccessModal }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const router = useRouter(); // FIX: Ensure useRouter is used properly

  const [country, setCountry] = useState("India");
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
      country,
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
        openSuccessModal && openSuccessModal(); // If function provided, call it
        // alert("Address submitted successfully!");
        toast.success("Address submitted successfully!");
        // Reset the form fields after successful submission
        setCountry("India");
        setState("Kerala");
        setCity("");
        setAddressLine1("");
        setAddressLine2("");
        setPinCode("");
        setRoomNumber("");

        // Optionally redirect or close modal
        handleClose(); // Close modal after success
      }
    } catch (error) {
      console.error("Error submitting address:", error);
      alert("An error occurred while submitting your address.");
    }
  };

  return (
    <div className={`bottom-modal ${showModal ? "open" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={handleClose} className="close-btn">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="address-form">
            <h4 className="text-center">Enter Your Delivery Address</h4>
            <p className="text-center">
              Start your journey by adding your address
            </p>

            <form onSubmit={handleSubmit}>
              {/* Dropdown for country */}
              <div className="input-container mb-3">
                <select
                  className="form-select custom-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="India">🇮🇳 India</option>
                  {/* Add more country options as needed */}
                </select>
              </div>

              {/* Dropdown for state */}
              <div className="input-container mb-3">
                <select
                  className="form-select custom-select"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
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
              <div className="input-container mb-3">
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="input-container mb-3">
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Address Line 1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  required
                />
              </div>
              <div className="input-container mb-3">
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Address Line 2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
              </div>
              <div className="input-container mb-1">
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="PIN Code"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  required
                />
              </div>
              <div className="input-container mb-3">
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Room Number"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                />
              </div>

              {/* Complete button */}
              <div className="d-grid mt-4">
                <button
                  type="submit"
                  className="btn btn-primary em-btn-complete"
                >
                  Complete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
