"use client";

// app/general-details/page.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './style.css'; // Import custom styles
import leftArrowIcon from '../../images/arrow-left.png';
import Image from 'next/image';

const GeneralDetails = () => {
  return (
    <div className="gd-profile-container">
      {/* Header with back button, title, and save button */}
      <div className="gd-header d-flex justify-content-between align-items-center">
        <div className='d-flex'>
        <Image src={leftArrowIcon} className='me-2'></Image>
        <h1 className="gd-title text-align-center">General Details</h1>
        </div>
        <button className="gd-save-btn">Save</button>
      </div>

      <form className="gd-form-container">
        {/* Full Name Field */}
        <div className="form-group gd-input-group">
          <label htmlFor="fullName" className="gd-input-label">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value="Sinan CP"
            className="form-control gd-input-field-right"
            readOnly
          />
        </div>

        {/* Phone Number Field */}
        <div className="form-group gd-input-group">
          <label htmlFor="phoneNumber" className="gd-input-label">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value="+91 997 44 6963 55"
            className="form-control gd-input-field-right"
            readOnly
          />
        </div>

        {/* Email Field */}
        <div className="form-group gd-input-group">
          <label htmlFor="email" className="gd-input-label">Gmail</label>
          <input
            type="email"
            id="email"
            name="email"
            value="Sinanysf828@gmail.com"
            className="form-control gd-input-field-right"
            readOnly
          />
        </div>
      </form>
    </div>
  );
};

export default GeneralDetails;
