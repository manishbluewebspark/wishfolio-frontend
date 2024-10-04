// pages/profile.js

import React from 'react';
import Image from 'next/image';
import profile from '../images/Male15.png'
import './style.css'

const Profile = () => {
  return (
        <div className="pf-profile-container container">
      {/* Top Section with Profile Image and User Information */}
      <div className="pf-header text-center ">
        <Image
          src={profile} // Use your image path here
          alt="Profile Picture"
          className="pf-profile-image"
          width={137}
          height={137}
        />
      </div>
      <div className='pf-header-2'>
      <h4 className="pf-user-name">Hello Sinan</h4>
        <p className="pf-phone-number">+1876 3291 727</p>

      </div>

      {/* Balance Section with "Deposit" Button */}
      <div className="pf-balance-section">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="pf-balance-label">Available Balance</p>
            <h3 className="pf-balance-amount">₹23,492</h3>
          </div>
          <button className="pf-deposit-button">Deposit</button>
        </div>
      </div>

      {/* Menu Section with List Items */}
      <div className="pf-menu mt-3">
        <div className="pf-menu-item d-flex align-items-center">
          <img src="/icons/orders-icon.png" alt="Orders" className="pf-menu-icon" />
          <span>My Orders</span>
        </div>
        <div className="pf-menu-item d-flex align-items-center">
          <img src="/icons/general-icon.png" alt="General Details" className="pf-menu-icon" />
          <span>General Details</span>
        </div>
        <div className="pf-menu-item d-flex align-items-center">
          <img src="/icons/password-icon.png" alt="Change Password" className="pf-menu-icon" />
          <span>Change Password</span>
        </div>
        <div className="pf-menu-item d-flex align-items-center">
          <img src="/icons/help-icon.png" alt="Help" className="pf-menu-icon" />
          <span>How is it working?</span>
        </div>
        <div className="pf-menu-item d-flex align-items-center">
          <img src="/icons/terms-icon.png" alt="Terms" className="pf-menu-icon" />
          <span>Terms & Conditions</span>
        </div>
      </div>

      {/* Logout Button */}
      <div className="pf-logout text-center mt-4">
        <button className="pf-logout-button">Logout</button>
      </div>
        </div>
  );
};

export default Profile;
