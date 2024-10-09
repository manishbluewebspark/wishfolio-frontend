"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./paymethod.css"; // Custom CSS file
import { Icon } from "@iconify/react";
import clipboardIcon from "@iconify/icons-mdi/clipboard"; // Importing specific MDI icon
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const TransferWithUpi = () => {
  const router = useRouter();
  const paymentData = useSelector((state) => state.payment);
  return (
    <div className="container twu-container">
      {/* Back Button */}
      <div className="twu-header">
        <button className="twu-back-btn" onClick={() => router.push("/")}>
          ← Back
        </button>
      </div>

      {/* Title Section */}
      {/* Payment Details Section */}
      <div className="twu-input-section">
        <p className="twu-title">
          You can transfer the money to the bank account below and submit your
          transaction ID.
        </p>

        {/* Payment Provider */}
        <div className="twu-section-row">
          <div>
            <div className="twu-label">Payment Provider</div>
            <div className="twu-balance">Google Pay</div>
          </div>
          <Icon icon={clipboardIcon} className="twu-copy-icon" />
        </div>

        {/* Phone Number */}
        <div className="twu-section-row">
          <div>
            <div className="twu-label">Phone Number</div>
            <div className="twu-balance">+91 96 85737 3735</div>
          </div>
          <Icon icon={clipboardIcon} className="twu-copy-icon" />
        </div>

        {/* UPI ID */}
        <div className="twu-section-row">
          <div>
            <div className="twu-label">UPI ID</div>
            <div className="twu-balance">Sinna@okicici</div>
          </div>
          <Icon icon={clipboardIcon} className="twu-copy-icon" />
        </div>
      </div>

      {/* Amount and Commission Section */}
      <div className="twu-amount-section">
        <div className="twu-row">
          <span className="twu-label">Transferring Amount</span>
          <span className="twu-balance">₹ {paymentData?.amount}</span>
        </div>

        <div className="twu-row">
          <span className="twu-label">Platform Commission 0%</span>
          <span className="twu-balance">₹ 0</span>
        </div>
      </div>

      {/* Final Amount Section */}
      <div className="twu-final-amount-box">
        <span className="twu-final-amount">You Will Receive</span>
        <span className="twu-final-amount-value">₹ {paymentData?.amount}</span>
      </div>
    </div>
  );
};

export default TransferWithUpi;
