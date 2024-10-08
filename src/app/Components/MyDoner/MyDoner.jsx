// DonorList.js

import React from 'react';
import Image from 'next/image';
import './style.css';
import profilePic from '../../images/Male15.png';  // Example profile picture

const donors = [
  { name: 'Theresa Webb', date: '25 Jan 2024', time: '12:34 AM', amount: '+₹500', verified: true },
  { name: 'Ronald Richards', date: '25 Jan 2024', time: '12:34 AM', amount: '+₹500', verified: true },
  { name: 'Bessie Cooper', date: '25 Jan 2024', time: '12:34 AM', amount: '+₹500', verified: false },
  { name: 'Sinan CP', date: '25 Jan 2024', time: '12:34 AM', amount: '+₹500', verified: true },
];

const MyDoner = () => {
  return (
    <div className="pf-donor-container">
      {/* Header Section */}
      <div className="pf-donor-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div className="pf-donor-avatar">
            <Image src={profilePic} alt="avatar" width={40} height={40} className="pf-avatar-img" />
          </div>
          <span className="pf-donor-title">Donors</span>
        </div>
        <span className="pf-donor-count">6 / 10</span>
      </div>

      {/* Donor List */}
      <div className="pf-donor-list">
        {donors.map((donor, index) => (
          <div key={index} className="pf-donor-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Image src={profilePic} alt={donor.name} width={40} height={40} className="pf-donor-img" />
              <div className="pf-donor-details">
                <div className="d-flex align-items-center">
                  <span className="pf-donor-name">{donor.name}</span>
                  {donor.verified && <span className="pf-verified-icon">✔️</span>}
                </div>
                <span className="pf-donor-time">{donor.date} • {donor.time}</span>
              </div>
            </div>
            <span className="pf-donor-amount">{donor.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDoner;
