// app/statistics/page.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './style.css'; // Import custom styles
import Image from 'next/image';
// import starIcon from '../../images/star.png'; // Replace with actual paths to icons
import dollarIcon from '../../images/dollar-circle.png'; // Replace with your icons
import dropIcon from '../../images/drop.png'; // Replace with your icons

const HowItWorkLevel = () => {
  return (
    <div className="hwl-statistics-section shadow-sm">
      <div className="hwl-statistics-inside-sec">
        {/* Star Level Section */}
        <div className="hwl-level-content d-flex">
          <div className="hwl-level-icon-section">
            <Image src={''} alt="Star" className="hwl-level-icon" />
            <div className='hwl-current-level-badge-con'>
            <span className="hwl-current-level-badge">Current Level</span>
            </div>
          </div>
          <div className="hwl-wishing-items">
            <h5>Wishing Items</h5>
            <p>₹50,000 - ₹100,000 Worth Items</p>
          </div>
        </div>

        {/* Target Section */}
        <div className="hwl-target-section">
          <h6>Target to be completed</h6>
          <div className="hwl-stat-item d-flex align-items-center">
            <Image src={dollarIcon} alt="Min Donations" className="hwl-icon" />
            <div className="hwl-stat-text d-flex justify-content-between w-100 align-items-center">
              <span>Min Donations</span>
              <h6>₹10,000</h6>
            </div>
          </div>

          <div className="hwl-stat-item d-flex align-items-center">
            <Image src={dropIcon} alt="Number of Donations" className="hwl-icon" />
            <div className="hwl-stat-text d-flex justify-content-between w-100 align-items-center">
              <span>Number of Donations</span>
              <h6>10</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorkLevel;
