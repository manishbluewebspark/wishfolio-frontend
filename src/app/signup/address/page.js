"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from "../../images/snow.png"; // Replace with your logo path
// import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import BackButton from "../../Components/Button/BackButton";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const AddressForm = () => {
  const { email, name, mobile } = useSelector((state) => state.signup);
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Kerala");
  const [city, setCity] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  // const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = {
    //   country,
    //   state,
    //   city,
    //   addressLine1,
    //   addressLine2,
    //   pinCode,
    //   roomNumber,
    // };

    const formData = {
      name: name,
      country: country,
      state: state,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      pincode: pinCode,
      roomNumber: roomNumber,
      email: email,

      userRole: 2,
      mobile: mobile,
      city,
    };
    try {
      const response = await axios.post(`${API_BASE_URL}/user`, formData);
      if (response.status === 201) {
        router.push("/login");
        console.log("Form Data:", formData);
        toast.success("submitted successfully!");
        // alert("submitted successfully!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error sending verification code:", error);
    }
  };

  return (
    <div className="d-flex em-address-main-container">
      <div className="em-back-btn">
        <BackButton></BackButton>
      </div>
      <div className="em-address-container">
        <div className="em-address-box">
          <div className="em-address-box-top">
            <Image
              src={logo}
              alt="Logo"
              className="em-address-box-logo"
              width={32}
              height={32}
            />
            <div className="em-address-top-text">
              <h2 className="em-address-heading">
                Enter your Delivery Address
              </h2>
              <p className="subtext">
                Start your wishing journey by signing up.
              </p>
            </div>
          </div>

          {/* Address Form */}
          <form onSubmit={handleSubmit}>
            {/* Dropdown for country */}
            <div className="input-container">
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
            <div className="input-container">
              <select
                className="form-select custom-select"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="Kerala">Kerala</option>
                {/* Add more state options as needed */}
              </select>
            </div>

            {/* Input fields for City, Address Line 1, Address Line 2, PIN Code, Room Number */}
            <div className="input-container">
              <input
                type="text"
                className="form-control custom-input"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Address Line 1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Address Line 2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                className="form-control custom-input"
                placeholder="PIN Code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Room Number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </div>
            {/* <div className="input-container">
              <input
                type="password"
                className="form-control custom-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div> */}
            <div className="terms-container-hw">
              By continuing, you agree to our
              <a href="/privacy-policy" className="text-muted-hw">
                {" "}
                Privacy Policy
              </a>
              and
              <a href="/terms-of-service" className="text-muted-hw">
                {" "}
                Terms of Service
              </a>
              .
            </div>

            {/* Complete button */}
            <div className="d-grid em-margin-top">
              <button type="submit" className="btn btn-primary em-btn-complete">
                Complete
              </button>
            </div>
          </form>

          {/* Policy and terms */}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
