import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Image from "next/image";
import dollarIcon from "../../images/dollar-circle.png"; // Replace with your icons
import dropIcon from "../../images/drop.png"; // Replace with your icons
import emojiIcon from "../../images/emoji1.png";

const StatisticsLevelUp = ({ levelData }) => {
  return (
    <div className="slv-statistics-section shadow-sm">
      <div className="slv-statistics-inside-sec">
        {/* Star Level Section */}
        <div className="slv-level-content d-flex align-items-center justify-content-center">
          <div className="slv-wishing-items">
            <h5>Wishing Items</h5>
            <p>{levelData?.worthItem}</p>
          </div>
        </div>

        {/* Target Section */}
        <div className="slv-target-section">
          <h6 className="slv-Target-text">Target to be completed</h6>
          <div className="slv-stat-item d-flex align-items-center">
            <Image src={dollarIcon} alt="Min Donations" className="slv-icon" />
            <div className="slv-stat-text d-flex justify-content-between w-100 align-items-center">
              <span>Min Contribution</span>
              <h6>₹{levelData?.minimumDonation}</h6>
            </div>
          </div>

          {/* <div
            className="slv-stat-item d-flex align-items-center"
            style={{ marginBottom: "0px !important" }}
          >
            <Image
              src={dropIcon}
              alt="Number of Donations"
              className="slv-icon"
            />
            <div className="slv-stat-text d-flex justify-content-between w-100 align-items-center">
              <span>Number of Donations</span>
              <h6>{levelData?.numberOfDonations}</h6>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StatisticsLevelUp;
