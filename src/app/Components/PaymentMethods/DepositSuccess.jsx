// app/success/page.js

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
// import './paymethod.css'; // Import custom styles
import successIcon from "../../images/91.png"; // Replace with your actual icon path
import Image from "next/image";

const DepositSuccess = () => {
  return (
    <div className="position-relative">
      <button className="tx-close-btn">&times;</button>

      <div className="tx-main-container container">
        <div className="tx-success-container text-center">
          {/* Success icon */}
          <Image src={successIcon} alt="Success" className="tx-success-icon" />

          {/* Message */}
          <h2 className="tx-title">Wohoo!</h2>
          <p className="tx-subtitle">Your deposit was successful.</p>

          {/* Current Balance */}
          <p className="tx-balance">
            Current Balance <span className="tx-balance-amount">₹54,990</span>
          </p>

          {/* Button to go to the profile */}
          <button className="tx-profile-btn">Go To Profile</button>
        </div>
      </div>
    </div>
  );
};

export default DepositSuccess;
