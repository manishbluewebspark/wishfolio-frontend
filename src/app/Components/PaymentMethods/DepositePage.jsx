'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './paymethod.css'; // Custom CSS file

const DepositPage = () => {
  return (
    <div className="container dp-container">
      {/* Back Button */}
      <div className="dp-header">
        <button className="dp-back-btn">
          ← Back
        </button>
      </div>

      {/* Title and Description */}
      <div className="text-center mt-4">
        <h5 className="dp-title">Enter Deposit Amount</h5>
        <p className="dp-subtitle">How much would you like to deposit?</p>
      </div>

      {/* Deposit Input Box */}
      <div className="dp-input-section text-center p-4 rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="dp-label">Enter Amount</span>
          <span className="dp-balance">Current Balance <strong>₹54,990</strong></span>
        </div>

        {/* Input Field */}
        <div className="dp-amount-box text-center">
          <span className="dp-rupee-sign">₹</span>
          <input
            type="text"
            className="dp-amount-input"
            placeholder="1,000"
            // disabled
          />
        </div>

        {/* Predefined Buttons */}
        <div className="dp-quick-amount mt-4">
          <button className="dp-quick-btn"><span>₹1k</span></button>
          <button className="dp-quick-btn">₹5k</button>
          <button className="dp-quick-btn">₹10k</button>
          <button className="dp-quick-btn">₹50k</button>
          <button className="dp-quick-btn">₹100k</button>
        </div>
      </div>

      {/* Terms and Privacy */}
      <div className="text-center mt-3 dp-terms">
        By continuing, you agree to our <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>
      </div>

      {/* Continue Button */}
      <div className="dp-continue-btn-wrapper mt-4">
        <button className="dp-continue-btn" disabled>
          Continue
        </button>
      </div>
    </div>
  );
};

export default DepositPage;
