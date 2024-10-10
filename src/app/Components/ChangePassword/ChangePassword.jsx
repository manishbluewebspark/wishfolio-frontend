// app/change-password/page.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './style.css'; // Import custom styles
import leftArrowIcon from '../../images/arrow-left.png'; // Replace with your actual icon path
import Image from 'next/image';

const ChangePassword = () => {
  return (
    <div className="cp-profile-container">
      {/* Header with back button, title, and update button */}
      <div className="cp-header d-flex justify-content-between align-items-center">
        <div className='d-flex align-items-center'>
          <Image src={leftArrowIcon} className='me-2' alt="Back" />
          <h1 className="cp-title">Change Password</h1>
        </div>
        <button className="cp-update-btn">Update</button>
      </div>

      <form className="cp-form-container">
        {/* Current Password Field */}
        <div className="form-group cp-input-group">
          <label htmlFor="currentPassword" className="cp-input-label">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className="form-control cp-input-field-right"
          />
        </div>

        {/* New Password Field */}
        <div className="form-group cp-input-group">
          <label htmlFor="newPassword" className="cp-input-label">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="form-control cp-input-field-right"
          />
        </div>

        {/* Confirm New Password Field */}
        <div className="form-group cp-input-group">
          <label htmlFor="confirmPassword" className="cp-input-label">Update Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control cp-input-field-right"
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
