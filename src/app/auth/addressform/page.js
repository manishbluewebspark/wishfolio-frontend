'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import logo from '../../images/snow.png'; // Replace with your logo path
import './style.css';

const AddressForm = () => {
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Kerala');
  const [city, setCity] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      country,
      state,
      city,
      addressLine1,
      addressLine2,
      pinCode,
      roomNumber,
    };
    console.log('Form Data:', formData);
    alert('Address submitted successfully!');
  };

  return (
    <div className="d-flex em-address-main-container">
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
              <h2 className="em-address-heading">Enter your Delivery Address</h2>
              <p className="subtext">Start your wishing journey by signing up.</p>
            </div>
          </div>

          {/* Address Form */}
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
                <option value="Kerala">Kerala</option>
                {/* Add more state options as needed */}
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
              <button type="submit" className="btn btn-primary em-btn-complete">
                Complete
              </button>
            </div>
          </form>

          {/* Policy and terms */}
          <div className="text-center mt-2">
            <a href="/privacy-policy" className="text-muted">
              By continuing, you agree to our Privacy Policy and Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
