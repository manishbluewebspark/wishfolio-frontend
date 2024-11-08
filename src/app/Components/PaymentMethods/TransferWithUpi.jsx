"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { Icon } from "@iconify/react";
import clipboardIcon from "../../images/copy.png";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import BackButton from "../Button/BackButton";
import CurrencyName from "../Comman/CurrencyName";
import Image from "next/image";
import { useState } from "react";

const TransferWithUpi = () => {
  const router = useRouter();
  const paymentData = useSelector((state) => state.payment);
  const [copied, setCopied] = useState(null); // State to show copied message

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
      setTimeout(() => setCopied(null), 1000); // Hide message after 1 second
    });
  };

  return (
    <>
      <BackButton title={"Back"} />
      <div className="twu-container">
        {/* Title Section */}
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
            <span
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => handleCopy("Google Pay", "Payment Provider")}
            >
              <Image src={clipboardIcon} height={20} width={20} alt="copyicon" />
              {copied === "Payment Provider" && <span>Copied</span>}
            </span>
          </div>

          {/* Phone Number */}
          <div className="twu-section-row">
            <div>
              <div className="twu-label">Phone Number</div>
              <div className="twu-balance">+91 96 85737 3735</div>
            </div>
            <span
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => handleCopy("+91 96 85737 3735", "Phone Number")}
            >
              <Image src={clipboardIcon} height={20} width={20} alt="copyicon" />
              {copied === "Phone Number" && <span>Copied</span>}
            </span>
          </div>

          {/* UPI ID */}
          <div className="twu-section-row">
            <div>
              <div className="twu-label">UPI ID</div>
              <div className="twu-balance">Sinna@okicici</div>
            </div>
            <span
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => handleCopy("Sinna@okicici", "UPI ID")}
            >
              <Image src={clipboardIcon} height={20} width={20} alt="copyicon" />
              {copied === "UPI ID" && <span>Copied</span>}
            </span>
          </div>
        </div>

        {/* Amount and Commission Section */}
        <div className="twu-amount-section">
          <div className="twu-row">
            <span className="twu-label">Transferring Amount</span>
            <span className="twu-balance">
              <CurrencyName /> {paymentData?.amount}
            </span>
          </div>

          <div className="twu-row">
            <span className="twu-label">Platform Commission 0%</span>
            <span className="twu-balance">
              <CurrencyName /> 0
            </span>
          </div>
        </div>

        {/* Final Amount Section */}
        <div className="twu-final-amount-box">
          <span className="twu-final-amount">You Will Receive</span>
          <span className="twu-final-amount-value">
            <CurrencyName /> {paymentData?.amount}
          </span>
        </div>
      </div>
    </>
  );
};

export default TransferWithUpi;
