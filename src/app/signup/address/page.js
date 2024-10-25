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
import arrowdown from '../../images/arrow-down.svg';

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
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error sending verification code:", error);
    }
  };

  return (
    <>
      <div className="address-main-container">
        <BackButton />
        <div className="address-container">
          <div className="address-box">
            <div className="address-box-top">
              <Image
                src={logo}
                alt="Logo"
                className="address-box-logo"
                width={32}
                height={32}
              />
              <div className="address-top-text">
                <h2 className="address-heading">
                  Enter your Delivery Address
                </h2>
                <p className="address-subtext">
                  Start your wishing journey by signing up.
                </p>
              </div>
            </div>

            {/* Address Form */}
            <form onSubmit={handleSubmit}>
              {/* Country Dropdown */}
 <div className="input-group custom-input" style={{ marginBottom: '8px', position: 'relative' }}>
  <select
    className="form-select address-input-fill"
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    style={{ appearance: 'none', paddingRight: '40px', background: 'transparent', border: 'none' }}
  >
    <option value="India">Select Country</option>
    {/* Add more country options as needed */}
  </select>
  <Image
    src={arrowdown} // Adjust the path to your icon
    alt="Dropdown Icon"
    className="address-dropdown-icon"
    height={20}
    width={20}
  />
</div>



              {/* State Dropdown */}
              <div className="input-group custom-input" style={{ marginBottom: '8px', position: 'relative' }}>
  <select
    className="form-select address-input-fill"
    value={state}
    onChange={(e) => setState(e.target.value)}
    style={{ appearance: 'none', paddingRight: '40px', background: 'transparent', border: 'none' }}
  >
    <option value="Kerala">Select State</option>
    {/* Add more state options as needed */}
  </select>
  <Image
      src={arrowdown} // Adjust the path to your icon
      alt="Dropdown Icon"
      className="address-dropdown-icon"
      height={20}
      width={20}
  />
</div>


              {/* City Input */}
              <div className="input-group custom-input" style={{ marginBottom: '8px' }} >
                <input
                  type="text"
                  className="form-control address-input-fill"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              {/* Address Line 1 Input */}
              <div className="input-group custom-input" style={{ marginBottom: '8px' }} >
                <input
                  type="text"
                  className="form-control address-input-fill"
                  placeholder="Address Line 1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  required
                />
              </div>

              {/* Address Line 2 Input */}
              <div className="input-group custom-input" style={{ marginBottom: '8px' }} >
                <input
                  type="text"
                  className="form-control address-input-fill"
                  placeholder="Address Line 2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
              </div>

              {/* PIN Code Input */}
              <div className="input-group custom-input" style={{ marginBottom: '8px' }} >
                <input
                  type="text"
                  className="form-control address-input-fill"
                  placeholder="PIN Code"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  required
                />
              </div>

              {/* Room Number Input */}
              <div className="input-group custom-input" style={{ marginBottom: '8px' }} >
                <input
                  type="text"
                  className="form-control address-input-fill"
                  placeholder="Room Number"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                />
              </div>
              <div className="address-term-container">
                By continuing, you agree to our
                <a href="/privacy-policy" className="signup-text-muted-hw">
                  Privacy Policy
                </a>
                and
                <a href="/terms-of-service" className="signup-text-muted-hw">
                  Terms of Service
                </a>
                .
              </div>

              {/* Complete button */}
              <div className="d-grid address-margin-top">
                <button type="submit" className="btn btn-primary address-btn-complete">
                  Complete
                </button>
              </div>
            </form>


          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
